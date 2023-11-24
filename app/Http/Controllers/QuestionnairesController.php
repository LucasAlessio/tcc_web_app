<?php

namespace App\Http\Controllers;

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
		return $this->repository->getAll(collect($request->all()));
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(QuestionnaireRequest $request)
	{
		return $this->repository->create(array_merge($request->all(), [
			"user_id" => $request->user()->id,
		]));
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Questionnaire $questionnaire)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit($id)
	{
		$questionnaire = $this->repository->getById((int) $id);

		if (!$questionnaire) {
			throw new NotFoundHttpException("Nenhum registro encontrado");
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
	public function update(QuestionnaireRequest $request, $id)
	{
		$isAnswerd = AnswersGroup::query()
			->where([
				'questionnaire_id' => $id,
			])
			->limit(1)
			->get('id');

		try {
			$this->repository->update(intval($id), $request->validated(), $isAnswerd->count() > 0);
		} catch(\Exception $e) {
			throw new HttpException(Response::HTTP_UNPROCESSABLE_ENTITY, $e->getMessage());
		}
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy($id)
	{
		if (!$this->repository->delete((int) $id)) {
			throw new NotFoundHttpException("Nenhum registro encontrado");
		}
	}
}
