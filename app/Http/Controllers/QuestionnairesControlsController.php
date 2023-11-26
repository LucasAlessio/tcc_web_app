<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\SaveQuestionnairesToAnswerRequest;
use App\Repositories\QuestionnairesControlsRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class QuestionnairesControlsController extends Controller
{
	public function __construct(
		private QuestionnairesControlsRepository $repository,
	) { }

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Request $request, string $id)
	{
		$user = $request->user();
		$userId = $user->role != UserRole::ADMIN->value ? $user->id : null;
	
		$questionnaires = $this->repository->getAll((int) $id, $userId);

		if (!$questionnaires->count()) {
			throw new NotFoundHttpException("Nenhum registro encontrado.");
		}

		return $questionnaires;
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(SaveQuestionnairesToAnswerRequest $request, $id)
	{
		return $this->repository->update((int) $id, $request->validated()["questionnaires"]);
	}
}
