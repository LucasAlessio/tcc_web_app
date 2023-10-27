<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use App\Models\Psychologist;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
	 */
	public function rules(): array
	{
		$rules = [
			'name' => ['required', 'string', 'max:255'],
			'email' => ['required', 'string', 'email:rfc,dns', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
		];

		if ($this->user()->role == UserRole::PSYCHOLOGIST->value) {
			$rules['psychologist.registration_number'] = [
				'required',
				'string', Rule::unique(Psychologist::class, 'registration_number')->ignore($this->id, 'user_id')
			];
		}

		return $rules;
	}

	public function messages()
	{
		return [
			'name.required' => 'Por favor, informe o nome',
			'email.required' => 'Por favor, informe o e-mail',
			'email.email' => 'Por favor, informe um e-mail válido',
			'psychologist.registration_number.required' => 'Por favor, informe seu número de registro',
			'psychologist.registration_number.unique' => 'Este número de registro já está cadastrado',
		];
	}
}
