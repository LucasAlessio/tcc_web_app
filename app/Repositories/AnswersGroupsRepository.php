<?php

namespace App\Repositories;

use App\Models\AnswersGroup;
use Illuminate\Support\Collection;

interface AnswersGroupsRepository {

	public function getAll(int $patientId): object;

	public function getById(int $id): ?AnswersGroup;

	public function getToExport(Collection $filters): object;

}
