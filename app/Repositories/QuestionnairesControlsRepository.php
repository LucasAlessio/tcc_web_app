<?php

namespace App\Repositories;

interface QuestionnairesControlsRepository {

	public function getAll(int $patientId, ?int $ownerId = null): object;
	
	public function update(int $id, array $data): void;

}
