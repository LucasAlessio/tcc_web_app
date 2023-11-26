<?php

namespace App\Repositories;

use App\Enums\QuestionTypeEnum;
use App\Enums\SystemConfigEnum;
use App\Models\Question;
use App\Models\Questionnaire;
use Exception;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class EloquentQuestionnairesRepository implements QuestionnairesRepository {

	public function getAll(Collection $filters, ?int $ownerId = null): object {
		$query = Questionnaire::query()
			->with("psychologist");

		if (!empty($ownerId)) {
			$query->where("user_id", "=", $ownerId);
		}

		if ($filters->has("search")) {
			$query->where("name", "like", '%' . (string) $filters->get("search") . '%');
		}

		return $query->paginate(((int) $filters->get("limit")) ?: SystemConfigEnum::PAGE_LIMIT_DEFAULT->value);
	}

	public function getById(int $id, ?int $ownerId = null): ?Questionnaire {
		$query = Questionnaire::query()
			->where([
				'id' => $id,
			]);

		if (!empty($ownerId)) {
			$query->where("user_id", "=", $ownerId);
		}

		$questionnaire = $query->with('questions.alternatives')->first();

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

	public function update(int $id, array $data, bool $isAnswerd): Questionnaire
	{
		try {
			DB::beginTransaction();

			$questionnaire = Questionnaire::findOrFail($id);
			$questionnaire->update($data);

			$this->updateQuestions($questionnaire, $data['questions'], $isAnswerd);

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

	public function delete(int $id): bool {
		$questionnaire = Questionnaire::where([
			'id' => $id,
		])->first();

		if (!$questionnaire) {
			return false;
		}

		$deleted = $questionnaire->delete();
		return (bool) $deleted;
	}

	private function updateQuestions(Questionnaire $questionnaire, array $newQuestions, bool $isAnswerd) {
		$oldQuestions = Arr::keyBy($questionnaire->questions, 'id');
		$newQuestionsIds = [];

		foreach ($newQuestions as $key => $question) {
			$data = array_merge($question, [
				'position' => (int) $key,
			]);

			if (!empty($question["id"]) && array_key_exists($question["id"], $oldQuestions)) {
				$newQuestion = $oldQuestions[$question["id"]];

				if ($isAnswerd && $newQuestion->type != $data["type"]) {
					throw new Exception("Não é possível mudar o tipo de questões em instrumentos já respondidos.");
				}

				$newQuestion->fill($data);

				if ($newQuestion->isDirty()) {
					$newQuestion->save();
				}
			} else {
				if ($isAnswerd) {
					throw new Exception("Não é possível adicionar questões em instrumentos já respondidos.");
				}

				$newQuestion = $questionnaire->questions()->create($data);
			}

			$newQuestionsIds[] = $newQuestion->id;

			if (!in_array($question["type"], [QuestionTypeEnum::CHOICE->value, QuestionTypeEnum::MULTIPLE_CHOICE->value])) {
				$newQuestion->alternatives()->delete();
				continue;
			};

			$this->updateAlternatives($newQuestion, $question["alternatives"], $isAnswerd);
		}

		foreach($oldQuestions as $id => $question) {
			if (in_array($id, $newQuestionsIds)) continue;

			if ($isAnswerd) {
				throw new Exception("Não é possível remover questões de instrumentos já respondidos.");
			}

			$question->alternatives()->delete();
			$question->delete();
		}
	}

	private function updateAlternatives(Question $question, array $newAlternatives, bool $isAnswerd) {
		$oldAlternatives = Arr::keyBy($question->alternatives, 'id');
		$newAlternativesIds = [];

		foreach ($newAlternatives as $key => $alternative) {
			$data = array_merge($alternative, [
				'value' => (int) $key,
			]);

			if (!empty($alternative["id"]) && array_key_exists($alternative["id"], $oldAlternatives)) {
				$newAlternative = $oldAlternatives[$alternative["id"]];

				$newAlternative->fill($data);

				if ($newAlternative->isDirty()) {
					$newAlternative->save();
				}
			} else {
				if ($isAnswerd) {
					throw new Exception("Não é possível adicionar alternativas em instrumentos já respondidos.");
				}

				$newAlternative = $question->alternatives()->create($data);
			}

			$newAlternativesIds[] = $newAlternative->id;
		}

		foreach($oldAlternatives as $id => $alternative) {
			if (in_array($id, $newAlternativesIds)) continue;

			if ($isAnswerd) {
				throw new Exception("Não é possível remover alternativas de instrumentos já respondidos.");
			}
			
			$alternative->delete();
		}
	}
}
