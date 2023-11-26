<?php

namespace App\Repositories;

use App\Models\AnswersGroup;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;

class EloquentAnswersGroupsRepository implements AnswersGroupsRepository {

	public function getAll(int $patientId, ?int $ownerId = null): object
	{
		$query = AnswersGroup::query()
			->where([
				'user_id' => $patientId,
			]);

		if (!empty($ownerId)) {
			$query->whereHas('user.patient' , function(Builder $query) use($ownerId) {
				$query->where('psychologist_id', '=', $ownerId)->limit(1);
			});
		}

		$answersGroups = $query->with("questionnaire")->get();
		return $answersGroups;
	}

	public function getById(int $id, ?int $ownerId = null): ?AnswersGroup
	{
		$query = AnswersGroup::query()
			->where([
				'id' => $id,
			]);

		if (!empty($ownerId)) {
			$query->whereHas('user.patient' , function(Builder $query) use($ownerId) {
				$query->where('psychologist_id', '=', $ownerId)->limit(1);
			});
		}

		$answersGroup = $query->with(['questionnaire', 'answers.question', 'answers.alternative'])->first();

		return $answersGroup;
	}

	public function getToExport(Collection $filters): object {
		DB::statement("SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY', ''));");
		
		$subquery = AnswersGroup::query()
			->select(["id"])
			->where([
				"questionnaire_id" => $filters->get("id", -1),
			])
			->groupBy(["user_id"])
			->havingRaw("count(`user_id`) >= ?", [$filters->get("responsesQuantity", 1)]);

		if (!empty($filters->get("startDate"))) {
			$subquery->whereRaw("DATE(created_at) >= ?", [$filters->get("startDate")]);
		}

		if (!empty($filters->get("endDate"))) {
			$subquery->whereRaw("DATE(created_at) <= ?", [$filters->get("endDate")]);
		}

		return AnswersGroup::query()
			->whereIn("id", $subquery)
			->with(array_filter([
				((bool) $filters->get('withPatientsData', false) ? "user.patient" : ""),
				"answers.question",
				"answers.alternative"
			]))
			->get();
	}

	public function update(int $id, array $data): int {
		return AnswersGroup::query()
			->where(['id' => $id])
			->update($data);
	}
}
