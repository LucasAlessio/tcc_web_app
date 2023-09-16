<?php

namespace App\Repositories;

use App\Enums\SystemConfigEnum;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EloquentPatientsRepository implements PatientsRepository {

	public function create(array $data): User {
		try {
			DB::beginTransaction();

			$user = User::create(array_merge($data, [
				'password' => Hash::make($data["password"] ?? ""),
				'role' => UserRole::PSYCHOLOGIST->value,
			]));

			$user->psychologist()->create($data["psychologist"]);

			DB::commit();

			return $user;
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}

}
