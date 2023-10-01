<?php

namespace App\Repositories;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EloquentPatientsRepository implements PatientsRepository {

	public function create(array $data): User {
		try {
			DB::beginTransaction();

			$user = User::create(array_merge($data, [
				'password' => Hash::make($data["password"]),
				'role' => UserRole::PATIENT->value,
			]));

			$user->patient()->create($data);

			DB::commit();

			return $user;
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}

	public function update(int $id, array $data): User {
		try {
			DB::beginTransaction();

			$user = User::where([
				'role' => UserRole::PATIENT->value,
				'id' => $id,
			])->firstOrFail();

			$user->update(array_filter(
				array_merge($data, [
					'password' => !empty($data['password']) ? Hash::make($data['password']) : null,
				])
			));

			$user->patient()->updateOrCreate([], $data);

			DB::commit();

			return $user;
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}

}
