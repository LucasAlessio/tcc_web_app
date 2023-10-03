<?php

namespace App\Http\Controllers\Api;

use App\Enums\QuestionTypeEnum;
use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Repositories\QuestionnairesRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AnswersController extends Controller
{
	public function __construct(
		private QuestionnairesRepository $repository,
	) { }

	/**
	 * Store a newly created resource in storage.
	 */
	public function store($id, Request $request)
	{
		$questionnaire = $this->repository->getById((int) $id);

		if (!$questionnaire) {
			throw new NotFoundHttpException('Instrumento não localizado');
		}
		
		$rules = [
			'questions' => ['required', 'array', 'size:' . $questionnaire->questions->count()],
		];

		foreach($questionnaire->questions->toArray() as $key => $question) {
			$rules["questions.{$key}.id"] = ['required', 'integer', Rule::in([$question["id"]])];

			if (in_array($question["type"], [QuestionTypeEnum::CHOICE->value, QuestionTypeEnum::MULTIPLE_CHOICE->value])) {
				$rules["questions.{$key}.alternative"] = ['required', Rule::in(array_map(fn($value) => $value["id"], $question["alternatives"]))];
			} else {
				$rules["questions.{$key}.comment"] = ['required', 'string'];
			}

		}

		$validated = $request->validate($rules, [
			'questions.size' => 'Todas questões devem ser respondidas uma única vez',
			'questions.*.id.required' => 'Todas questões devem ser respondidas',
			'questions.*.id.in' => 'Identificador da questão inválido',
			'questions.*.alternative.required' => 'Todas questões devem ser respondidas',
			'questions.*.alternative.in' => 'A alternativa selecionada é inválida',
			'questions.*.comment.required' => 'Por favor, informe a resposta',
		]);

		$createdAt = new \DateTime('now');

		$answers = array_map(fn($value) => [
			'comment' => $value["comment"] ?? null,
			'questionnaire_id' => $questionnaire->id,
			'question_id' => $value["id"],
			'alternative_id' => $value["alternative"] ?? null,
			'user_id' => $request->user()->id,
			'created_at' => $createdAt,
		], $validated["questions"]);

		if (!Answer::insert($answers)) {
			throw new HttpException(
				Response::HTTP_INTERNAL_SERVER_ERROR,
				"Não foi possível as respostas. Tente novamente mais tarde."
			);
		}

		return response('', Response::HTTP_CREATED);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(string $id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, string $id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(string $id)
	{
		//
	}
}
