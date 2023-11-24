<?php

namespace App\Repositories;

use App\Models\Questionnaire;
use Illuminate\Database\Eloquent\Collection;

interface QuestionnairesRepository {

	public function getAll(Collection $filters): object;

	public function getById(int $id): ?Questionnaire;

	public function create(array $data): Questionnaire;

	/**
	 * @param integer $id
	 * @param array $data
	 * @param boolean $isAnswerd
	 * @return Questionnaire
	 * @throws \Exception
	 */
	public function update(int $id, array $data, bool $isAnswerd): Questionnaire;

	public function delete(int $id): bool;
	
	public function getAllFromPatient(int $patientId): object;

}
