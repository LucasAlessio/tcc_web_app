<?php

namespace App\Repositories;

use App\Models\User;

interface PatientsRepository {

	public function create(array $data): User;

	public function update(int $id, array $data): User;

}
