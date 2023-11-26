<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PsychologistPolicy
{
	/**
	 * Create a new policy instance.
	 */
	public function __construct() {}

	public function index(User $user) {
		return $user->role == UserRole::ADMIN->value
			? Response::allow()
			: Response::deny('Você não possui permissão para acessar esta página.');
	}

	public function store(User $user) {
		return $user->role == UserRole::ADMIN->value
			? Response::allow()
			: Response::deny('Você não possui permissão para realizar esta ação.');
	}

	public function edit(User $user) {
		return $user->role == UserRole::ADMIN->value
			? Response::allow()
			: Response::deny('Você não possui permissão para acessar esta página.');
	}

	public function update(User $user) {
		return $user->role == UserRole::ADMIN->value
			? Response::allow()
			: Response::deny('Você não possui permissão para realizar esta ação.');
	}

	public function destroy(User $user) {
		return $user->role == UserRole::ADMIN->value
			? Response::allow()
			: Response::deny('Você não possui permissão para realizar esta ação.');
	}
}
