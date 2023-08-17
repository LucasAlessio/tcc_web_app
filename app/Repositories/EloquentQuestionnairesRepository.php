<?php

namespace App\Repositories;

use App\Enums\QuestionTypeEnum;
use App\Models\Questionnaire;
use Illuminate\Support\Facades\DB;

class EloquentQuestionnairesRepository implements QuestionnairesRepository {

	public function add(array $data): Questionnaire
	{
		try {
			DB::beginTransaction();

			/** @var Questionnaire */
			$questionnaire = Questionnaire::create($data);
			
			foreach($data["questions"] as $question) {
				$alternatives = $question["alternatives"];
				
				/** @var Question */
				$question = $questionnaire->questions()->create($question);

				if ($question->type != QuestionTypeEnum::CHOICE->value) continue;

				$question->alternatives()->createMany($alternatives);
			}
			
			DB::commit();
			
			return $questionnaire->load('questions.alternatives');
		} catch (\Exception $e) {
			DB::rollBack();
		}
	}

	public function update(array $data): Questionnaire
	{
		try {
			DB::beginTransaction();

			/** @var Questionnaire */
			$questionnaire = Questionnaire::create($data);
			
			foreach($data["questions"] as $question) {
				$alternatives = $question["alternatives"];
				
				/** @var Question */
				$question = $questionnaire->questions()->create($question);

				if ($question->type != QuestionTypeEnum::CHOICE) continue;

				$question->alternatives()->createMany($alternatives);
			}
			
			return $questionnaire->load('questions.alternatives');

			DB::commit();
		} finally {
			DB::rollBack();
		}
	}

}
