<?php

namespace App\Repositories;

use App\Enums\QuestionTypeEnum;
use App\Enums\SystemConfigEnum;
use App\Enums\UserRole;
use App\Models\Question;
use App\Models\Questionnaire;
use App\Models\User;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EloquentQuestionnairesRepository implements QuestionnairesRepository {

	public function getAll(Collection $filters): object {
		$query = Questionnaire::query()
			->with("psychologist");

		if ($filters->has("search")) {
			$query->where("name", "like", '%' . (string) $filters->get("search") . '%');
		}

		return $query->paginate(((int) $filters->get("limit")) ?: SystemConfigEnum::PAGE_LIMIT_DEFAULT->value);
	}

	public function getById(int $id): ?Questionnaire {
		$questionnaire = Questionnaire::where([
			'id' => $id,
		])
			->with('questions.alternatives')
			->first();

		return $questionnaire;
	}

	public function create(array $data): Questionnaire
	{
		try {
			DB::beginTransaction();

			/** @var Questionnaire */
			$questionnaire = Questionnaire::create($data);
			
			foreach($data["questions"] as $key => $question) {
				$alternatives = array_map(function($value, $key) {
					return [
						...$value,
						"value" => $key,
					];
				}, $question["alternatives"], array_keys($question["alternatives"]));
				
				/** @var Question */
				$question = $questionnaire->questions()->create(array_merge($question, [
					'position' => (int) $key,
				]));

				if ($question->type != QuestionTypeEnum::CHOICE->value) continue;

				$question->alternatives()->createMany($alternatives);
			}
			
			DB::commit();
			
			return $questionnaire->load('questions.alternatives');
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}

	public function update(int $id, array $data): Questionnaire
	{
		try {
			DB::beginTransaction();

			$questionnaire = Questionnaire::findOrFail($id);
			$questionnaire->update($data);

			$this->updateQuestions($questionnaire, $data['questions']);

			DB::commit();

			return $questionnaire;
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}

	public function getAllFromPatient(int $patientId): object {
		return Questionnaire::query()
			->join('patients_questionnaires', function(JoinClause $join) use($patientId) {
				$join
					->on('patients_questionnaires.questionnaire_id', '=', 'questionnaires.id')
					->where('patients_questionnaires.user_id', '=', $patientId);
			})
			->leftJoin('answers_groups', function(JoinClause $join) {
				$join
					->on('answers_groups.questionnaire_id', '=', 'questionnaires.id')
					->on('answers_groups.user_id', '=', 'patients_questionnaires.user_id')
					->where('answers_groups.id', '=', function(Builder $query) {
						$query->select('id')
							->from('answers_groups')
							->whereColumn('answers_groups.questionnaire_id', '=', 'questionnaires.id')
							->whereColumn('answers_groups.user_id', '=', 'patients_questionnaires.user_id')
							->orderBy('created_at', 'DESC')
							->limit(1);
					});
			})
			->orderBy('questionnaires.id', 'ASC')
			->withCasts([
				'answers_groups.created_at' => 'datetime'
			])
			->get([
				'questionnaires.*',
				'answers_groups.created_at as answerd_at'
			]);
	}

	private function updateQuestions(Questionnaire $questionnaire, array $questions) {
		$oldQuestions = $questionnaire->questions;
		$oldQuestions = Arr::keyBy($oldQuestions, 'id');

		foreach ($questions as $key => $question) {
			$data = array_merge($question, [
				'position' => (int) $key,
			]);

			if (!empty($question["id"]) && array_key_exists($question["id"], $oldQuestions)) {
				$newQuestion = $oldQuestions[$question["id"]];

				if (!empty($question["deleted"])) {
					$newQuestion->delete();
					continue;
				}

				$newQuestion->fill($data);

				if ($newQuestion->isDirty()) {
					$newQuestion->save();
				}
			} else {
				$newQuestion = $questionnaire->questions()->create($data);
			}

			if (!in_array($question["type"], [QuestionTypeEnum::CHOICE->value, QuestionTypeEnum::MULTIPLE_CHOICE->value])) {
				// $newQuestion->alternatives()->delete();
				continue;
			};

			$this->updateAlternatives($newQuestion, $question["alternatives"]);
		}
	}

	private function updateAlternatives(Question $question, array $alternatives) {
		$oldAlternatives = $question->alternatives->toArray();
		// $oldAlternatives = Arr::keyBy($oldAlternatives, 'id');

		// foreach ($alternatives as $alternative) {
		// 	if ($alternative["id"]) {
		// 		$oldAlternative = Alternative::find($alternative["id"]);
		// 		$oldAlternative->fill($alternative);

		// 		if ($oldAlternative->isDirty()) {
		// 			$oldAlternative->save();
		// 		}
		// 	} else {
		// 		$question->alternatives()->create($alternative);
		// 	}

		// 	if ($question['type'] != QuestionTypeEnum::CHOICE) continue;
		// }
	}
}
