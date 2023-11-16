<?php

namespace App\Http\Requests;

use App\Enums\QuestionTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Arr;

class AnswersGroupRequest extends FormRequest
{
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
		return [
			'psychologist_comment' => ['string', 'nullable'],
		];
	}

	public function messages()
	{
		return [
			'psychologist_comment.string' => 'Por favor, informe um comentário válido',
		];
	}
}
