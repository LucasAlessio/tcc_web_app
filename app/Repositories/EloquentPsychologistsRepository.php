<?php

namespace App\Repositories;

use App\Enums\SystemConfigEnum;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EloquentPsychologistsRepository implements PsychologistsRepository {

	public function getAll(Collection $filters): object {
		$query = User::where('role', UserRole::PSYCHOLOGIST->value)->with('psychologist');

		if ($filters->has("search")) {
			$query->where("name", "like", '%' . (string) $filters->get("search") . '%');
		}

		return $query->paginate(((int) $filters->get("limit")) ?: SystemConfigEnum::PAGE_LIMIT_DEFAULT->value);
	}

	public function getById(int $id): ?User {
		return User::where([
			'role' => UserRole::PSYCHOLOGIST->value,
			'id' => $id,
		])
			->with('psychologist')
			->first();
	}

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

	public function update(int $id, array $data): User {
		try {
			DB::beginTransaction();

			$user = User::where([
				'role' => UserRole::PSYCHOLOGIST->value,
				'id' => $id,
			])->firstOrFail();

			$user->update(array_filter(
				array_merge($data, [
					'password' => !empty($data['password']) ? Hash::make($data['password']) : null,
				])
			));

			$user->psychologist()->updateOrCreate([], $data["psychologist"]);

			DB::commit();

			return $user;
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}

	public function delete(int $id): int {
		try {
			DB::beginTransaction();

			$user = User::where([
				'role' => UserRole::PSYCHOLOGIST->value,
				'id' => $id,
			])->first();

			if (!$user) {
				return 0;
			}

			$user->psychologist()->delete();
			$user->delete();

			DB::commit();

			return 1;
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}
}
