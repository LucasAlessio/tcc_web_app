<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\QuestionnaireRequest;
use App\Models\AnswersGroup;
use App\Models\Questionnaire;
use App\Repositories\QuestionnairesRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class QuestionnairesController extends Controller
{

	public function __construct(
		private QuestionnairesRepository $repository,
	) { }

	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		$user = $request->user();
		$userId = $user->role != UserRole::ADMIN->value ? $user->id : null;

		return $this->repository->getAll(collect($request->all()), $userId);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(QuestionnaireRequest $request)
	{
		$this->authorize('store', Questionnaire::class);

		return $this->repository->create(array_merge($request->all(), [
			"user_id" => $request->user()->id,
		]));
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Request $request, string $id)
	{
		$user = $request->user();
		$userId = $user->role != UserRole::ADMIN->value ? $user->id : null;

		$questionnaire = $this->repository->getById((int) $id, $userId);

		if (!$questionnaire) {
			throw new NotFoundHttpException("Nenhum registro encontrado.");
		}

		$isAnswerd = AnswersGroup::query()
			->where([
				'questionnaire_id' => $questionnaire->id,
			])
			->limit(1)
			->get('id');
	
		return array_merge($questionnaire->toArray(), [
			'isAnswerd' => $isAnswerd->count() > 0,
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(QuestionnaireRequest $request, Questionnaire $questionnaire)
	{
		$this->authorize('update', $questionnaire);

		$isAnswerd = AnswersGroup::query()
			->where([
				'questionnaire_id' => $questionnaire->id,
			])
			->limit(1)
			->get('id');

		try {
			$this->repository->update((int) $questionnaire->id, $request->validated(), $isAnswerd->count() > 0);
		} catch(\Exception $e) {
			throw new HttpException(Response::HTTP_UNPROCESSABLE_ENTITY, $e->getMessage());
		}
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Questionnaire $questionnaire)
	{
		$this->authorize('destroy', $questionnaire);

		if (!$this->repository->delete((int) $questionnaire->id)) {
			throw new HttpException(Response::HTTP_INTERNAL_SERVER_ERROR, "Não foi possível excluir o registro.");
		}
	}
}
