<?php

namespace App\Repositories;

use App\Models\AnswersGroup;
use Illuminate\Support\Collection;

interface AnswersGroupsRepository {

	public function getAll(int $patientId, ?int $ownerId = null): object;

	public function getById(int $id, ?int $ownerId = null): ?AnswersGroup;

	public function getToExport(Collection $filters, ?int $ownerId = null): object;

	public function update(int $id, array $data): int;

}
