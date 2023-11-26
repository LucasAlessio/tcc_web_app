<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use App\Exceptions\AuthorizationException;
use App\Models\Psychologist;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PsychologistRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize()
	{
		if ($this->user()->role != UserRole::ADMIN->value) {
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
			'email' => ['required', 'string', 'email:rfc,dns', 'max:255', Rule::unique(User::class)->ignore($this->id)],
			'psychologist.registration_number' => ['required', 'string', Rule::unique(Psychologist::class, 'registration_number')->ignore($this->id, 'user_id')],
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
			'psychologist.registration_number.required' => 'Por favor, informe o registro do psicólogo',
			'psychologist.registration_number.unique' => 'Este número de registro já está cadastrado',
			'password.required' => 'Por favor, informe a senha',
		];
	}
}
