<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\AnswersGroupRequest;
use App\Models\Answer;
use App\Models\AnswersGroup;
use App\Repositories\AnswersGroupsRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AnswersGroupsController extends Controller
{
	public function __construct(
		private AnswersGroupsRepository $repository,
	) { }

	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request, string $id)
	{
		$user = $request->user();
		$userId = $user->role != UserRole::ADMIN->value ? $user->id : null;

		return $this->repository->getAll((int) $id, $userId);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Request $request, $id)
	{
		$user = $request->user();
		$userId = $user->role != UserRole::ADMIN->value ? $user->id : null;

		$group = $this->repository->getById((int) $id, $userId);

		if (!$group) {
			throw new NotFoundHttpException("Nenhum registro encontrado.");
		}

		return $group;
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(AnswersGroupRequest $request, AnswersGroup $group)
	{
		$this->authorize('update', $group);

		$this->repository->update((int) $group->id, $request->validated());
	}
}
