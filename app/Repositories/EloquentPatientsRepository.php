<?php

namespace App\Repositories;

use App\Enums\SystemConfigEnum;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EloquentPatientsRepository implements PatientsRepository {

	public function getAll(Collection $filters): object
	{
		$query = User::query()
			->where('role', '=', UserRole::PATIENT->value)
			->with("patient.psychologist");

		if (!empty($filters->has("search"))) {
			$query
				->where("name", "like", '%' . (string) $filters->get("search") . '%')
				->orWhereHas('patient.psychologist' , function($query) use($filters) {
					$query->where('name', 'like', '%' . (string) $filters->get("search") . '%');
				});
		}

		return $query->paginate(((int) $filters->get("limit")) ?: SystemConfigEnum::PAGE_LIMIT_DEFAULT->value);
	}

	public function getById(int $id): ?User {
		$patient = User::where([
			'role' => UserRole::PATIENT->value,
			'id' => $id,
		])
			->with('patient.psychologist')
			->first();

		return $patient;
	}

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
