<?php

namespace App\Repositories;

use App\Models\AnswersGroup;

interface AnswersGroupsRepository {

	public function getAll(int $patientId): object;

	public function getById(int $id): ?AnswersGroup;

}
