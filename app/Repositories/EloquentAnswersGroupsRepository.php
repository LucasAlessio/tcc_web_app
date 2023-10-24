<?php

namespace App\Repositories;

use App\Models\AnswersGroup;

class EloquentAnswersGroupsRepository implements AnswersGroupsRepository {

	public function getAll(int $patientId): object
	{
		return AnswersGroup::query()
			->where([
				'user_id' => $patientId,
			])
			->with("questionnaire")
			->get();
	}

	public function getById(int $id): ?AnswersGroup
	{
		return AnswersGroup::query()
			->where([
				'id' => $id,
			])
			->with(['questionnaire', 'answers.question', 'answers.alternative'])
			->first();
	}

}
