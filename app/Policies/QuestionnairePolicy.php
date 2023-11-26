<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Questionnaire;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class QuestionnairePolicy
{
	/**
	 * Create a new policy instance.
	 */
	public function __construct() { }

	public function store(User $user) {
		return $user->role == UserRole::PSYCHOLOGIST->value
			? Response::allow()
			: Response::deny('Você não possui permissão para realizar esta ação.');
	}

	public function update(User $user, Questionnaire $questionnaire) {
		return $user->id === $questionnaire->user_id || $user->role == UserRole::ADMIN->value
			? Response::allow()
			: Response::deny('Você não possui permissão para realizar esta ação.');
	}

	public function destroy(User $user, Questionnaire $questionnaire) {
		return $user->id === $questionnaire->user_id || $user->role == UserRole::ADMIN->value
			? Response::allow()
			: Response::deny('Você não possui permissão para realizar esta ação.');
	}
}
