<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PatientPolicy
{
	/**
	 * Create a new policy instance.
	 */
	public function __construct() { }

	// public function show(User $user, ?User $patient) {
	// 	return $user->role == UserRole::ADMIN->value || $user->id == $patient?->patient->psychologist_id
	// 		? Response::allow()
	// 		: Response::deny('Você não possui permissão para acessar esta página.');
	// }
}
