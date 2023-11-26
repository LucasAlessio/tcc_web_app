<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\AnswersGroup;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AnswersGroupPolicy
{
	/**
	 * Create a new policy instance.
	 */
	public function __construct() { }

	public function update(User $user, AnswersGroup $group) {
		return $user->role == UserRole::ADMIN->value || $user->id === $group->questionnaire()->first()?->id_user
			? Response::allow()
			: Response::deny('Você não possui permissão para realizar esta ação.');
	}
}
