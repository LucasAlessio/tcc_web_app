<?php

namespace App\Repositories;

interface QuestionnairesControlsRepository {

	public function getAll(int $patientId): object;
	
	public function update(int $id, array $data): void;

}
