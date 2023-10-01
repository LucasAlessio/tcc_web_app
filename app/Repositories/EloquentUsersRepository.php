<?php

namespace App\Repositories;

use App\Models\User;

class EloquentUsersRepository implements UsersRepository {

	public function getByEmail(string $email): ?User
	{
		$user = User::where('email', $email)->first();

		return $user;
	}
}
