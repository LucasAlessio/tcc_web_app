<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface PatientsRepository {

	public function getAll(Collection $filters, ?int $ownerId = null): object;

	public function getById(int $id, ?int $ownerId = null): ?User;

	public function create(array $data): User;

	public function update(int $id, array $data): User;

}
