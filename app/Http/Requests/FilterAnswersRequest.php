<?php

namespace App\Http\Requests;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FilterAnswersRequest extends FormRequest
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
			'id' => ['required', 'integer', 'min:1'],
			'startDate' => ['nullable', 'date'],
			'endDate' => ['nullable', 'date', 'after_or_equal:startDate'],
			'responsesQuantity' => ['required', 'integer', 'min:1'],
			'format' => ['required', 'string', Rule::in(["rows", "columns"])],
			'withPatientsData' => ['required', 'boolean'],
		];
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, array|string>
	 */
	public function messages(): array
	{
		return [
			'startDate.date' => 'Por favor, informe uma data válida.',
			'endDate.date' => 'Por favor, informe uma data válida.',
			'endDate.after_or_equal' => 'A data final deve ser maior ou igual à data inicial.',
			'responsesQuantity.required' => 'Por favor, informe o número de respostas para incluir na exportação.',
			'responsesQuantity.min' => 'Por favor, informe o número de respostas para incluir na exportação.',
			'format.required' => 'Por favor, informe o formato de exportação.',
			'format.required' => 'Por favor, informe um formato válido.',
			'withPatientsData.required' => 'Por favor, informe se os dados do paciente devem ser inclusos na exportação.',
			'withPatientsData.boolean' => 'Por favor, informe um válor válido.',
		];
	}
}
