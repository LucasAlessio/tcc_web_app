<?php

namespace App\Http\Requests;

use App\Enums\QuestionTypeEnum;
use App\Enums\UserRole;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Auth\Access\Response;
use Illuminate\Validation\Rule;

class QuestionnaireRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize()
	{
		if ($this->isMethod('post') && $this->user()->role != UserRole::PSYCHOLOGIST->value) {
			// throw new AuthorizationException();
			return Response::deny('Você não possui permissão para realizar esta ação.');
		}

		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
	 */
	public function rules(): array
	{
		return [
			'name' => ['required', 'string'],
			'description' => ['required', 'string'],
			'recurrence' => ['required', 'integer', 'regex:/^[+]?\d+([.]\d+)?$/'],
			'questions' => ['required', 'array', 'min:1'],
			'questions.*.id' => ['nullable', 'integer'],
			'questions.*.description' => ['required', 'string'],
			'questions.*.type' => ['required', 'integer', Rule::in(QuestionTypeEnum::getValues())],
			'questions.*.alternatives' => [
				'required_if:questions.*.type,' . QuestionTypeEnum::CHOICE->value,
				'required_if:questions.*.type,' . QuestionTypeEnum::MULTIPLE_CHOICE->value,
				'array'
			],
			'questions.*.alternatives.*.id' => ['nullable', 'integer'],
            'questions.*.alternatives.*.description' => [
				'required_if:questions.*.type,' . QuestionTypeEnum::CHOICE->value,
				'required_if:questions.*.type,' . QuestionTypeEnum::MULTIPLE_CHOICE->value,
				'nullable',
				'string'
			],
		];
	}

	public function withValidator($validator)
	{
		$validator->sometimes('questions.*.alternatives', ['min:2'], function ($input, $attr) {
			return in_array($attr['type'], [QuestionTypeEnum::CHOICE->value, QuestionTypeEnum::MULTIPLE_CHOICE->value]);
		});

		$validator->sometimes('id', ['required', 'integer'], function ($input) {
			// Verifique se é uma atualização de registro
			return $this->getMethod() === 'PUT';
		});

		// $validator->sometimes('questions.*.id', ['required', 'integer'], function ($input) {
		// 	// Verifique se é uma atualização de registro
		// 	return $this->getMethod() === 'PUT';
		// });

		// $validator->sometimes('questions.*.alternatives.*.id', ['required', 'integer'], function ($input) {
		// 	// Verifique se é uma atualização de registro
		// 	return $this->getMethod() === 'PUT';
		// });
	}

	public function messages()
	{
		return [
			'name' => 'Por favor, informe o nome do instrumento',
			'description' => 'Por favor, informe uma descrição para o instrumento',
			'recurrence' => 'Por favor, informe a recorrência do instrumento',
			'questions' => [
				'required' => 'Por favor, informe a lista de questões do instrumento',
				'min' => 'O questionário deve conter no mínimo :min questões'
			],
			'questions.*.alternatives' => [
				'required_if' => 'Por favor, informe as alternativas da questão',
				'min' => 'A questão deve conter no mínimo :min alternativas',
			],
			'questions.*.description' => [
				'required' => 'Por favor, informe a questão'
			],
			'questions.*.alternatives.*.description' => [
				'required_if' => 'Por favor, informe a alternativa',
				'string' => 'Por favor, informe a alternativa',
			]
		];
	}
}
