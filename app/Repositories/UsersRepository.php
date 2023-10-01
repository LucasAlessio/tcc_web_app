<?php

namespace App\Repositories;

use App\Models\User;

interface UsersRepository {

	public function getByEmail(string $email): ?User;

}
