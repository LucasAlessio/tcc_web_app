<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface PsychologistsRepository {

	public function getAll(Collection $filters): object;

	public function getById(int $id): ?User;

	public function create(array $data): User;

	public function update(int $id, array $data): User;

	public function delete(int $id): int;

}
