<?php

namespace App\Repositories;

use App\Enums\QuestionTypeEnum;
use App\Enums\SystemConfigEnum;
use App\Models\Question;
use App\Models\Questionnaire;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

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

	public function getAllFromPatient(): object {
		$query = Questionnaire::all();
		return $query;
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
