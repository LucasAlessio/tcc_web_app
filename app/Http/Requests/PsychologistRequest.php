<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use App\Exceptions\AuthorizationException;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PsychologistRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		if (($this->user()->role ?? "") != UserRole::ADMIN->value) {
			throw new AuthorizationException();
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
			'email' => ['required', 'string', 'email:rfc,dns', 'max:255', Rule::unique(User::class)->ignore($this->id)],
			'password' => [],
		];
	}

	public function withValidator($validator)
	{
		$validator->sometimes('password', ['required', 'string'], function ($input) {
			// Verifique se é uma criação de novo registro
			return $this->getMethod() === 'POST';
		});
	}

	public function messages()
	{
		return [
			'name.required' => 'Por favor, informe o nome',
			'email.required' => 'Por favor, informe o e-mail',
			'email.email' => 'Por favor, informe um e-mail válido',
			'email.unique' => 'Este e-mail já está em uso',
			'password.required' => 'Por favor, informe a senha',
		];
	}
}
