<?php

namespace App\Repositories;

use App\Enums\UserRole;
use App\Models\Questionnaire;
use App\Models\User;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;
use stdClass;

class EloquentQuestionnairesControlsRepository implements QuestionnairesControlsRepository {

	public function getAll(int $patientId): object
	{
		return Questionnaire::join('users', function(JoinClause $join) {
			$join
				->on('users.id', '=', 'questionnaires.user_id')
				->where([
					'users.role' => UserRole::PSYCHOLOGIST->value,
				]);
		})->join('patients', function(JoinClause $join) use($patientId) {
			$join
				->on('patients.psychologist_id', '=', 'users.id')
				->where([
					'patients.user_id' => $patientId,
				]);
		})->leftJoin('patients_questionnaires', function(JoinClause $join) use($patientId) {
			$join
				->on('patients_questionnaires.questionnaire_id', '=', 'questionnaires.id')
				->where('patients_questionnaires.user_id', '=', $patientId);
		})->get([
			'questionnaires.id',
			'questionnaires.name',
			DB::Raw('IF(`patients_questionnaires`.`user_id` IS NULL, false, true) AS `active`'),
		]);
	}

	public function update(int $id, array $data): void
	{
		$questionnaires = array_reduce($data, function($carry, $item) {
			if ($item['active']) {
				$carry[] = $item["id"];
			}

			return $carry;
		}, []);

		try {
			DB::beginTransaction();

			$user = User::find($id);
			$user->questionnairesToAnswer()->sync($questionnaires, $detach = true);

			DB::commit();
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}

}
