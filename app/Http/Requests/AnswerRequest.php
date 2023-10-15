<?php

namespace App\Http\Requests;

use App\Enums\QuestionTypeEnum;
use App\Repositories\QuestionnairesRepository;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AnswerRequest extends FormRequest
{
	public function __construct(
		private QuestionnairesRepository $repository,
	) {	}

	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
	 */
	public function rules(): array
	{
		$questionnaire = $this->repository->getById((int) $this->route('id', -1));

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
		
		return $rules;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, string>
	 */
	public function messages()
	{
		return [
			'questions.size' => 'Todas questões devem ser respondidas uma única vez',
			'questions.*.id.required' => 'Todas questões devem ser respondidas',
			'questions.*.id.in' => 'Identificador da questão inválido',
			'questions.*.alternative.required' => 'Todas questões devem ser respondidas',
			'questions.*.alternative.in' => 'A alternativa selecionada é inválida',
			'questions.*.comment.required' => 'Por favor, informe a resposta',
		];
	}
}
