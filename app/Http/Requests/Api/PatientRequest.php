<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class PatientRequest extends FormRequest
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
			'name' => ['required', 'string', 'max:255'],
			'email' => ['required', 'string', 'email:rfc,dns', 'max:255', Rule::unique(User::class)->ignore($this->user()->id ?? 0)],
			'gender' => ['required', Rule::in(\App\Enums\GenderEnum::getValues())],
			'occupation' => ['required', 'string', 'max:255'],
			'marital_status' => ['required', Rule::in(\App\Enums\MaritalStatusEnum::getValues())],
			'family_income' => ['required', Rule::in(\App\Enums\FamilyIncomeEnum::getValues())],
			'schooling' => ['required', Rule::in(\App\Enums\SchoolingEnum::getValues())],
			'family_with_chronic_illnesses' => ['required', 'boolean'],
			'family_with_psychiatric_disorders' => ['required', 'boolean'],
			'password' => ['required', Password::defaults()],
			'password_confirmation' => ['required_with:password', 'same:password'],
		];
	}

	public function messages(): array
	{
		return [
			'name.required' => 'Por favor, informe o nome',
			'email' => [
				'required' => 'Por favor, informe o e-mail',
				'email' => 'Por favor, informe um e-mail válido',
				'unique' => 'Este endereço de e-mail já está em uso',
			],
			'gender' => [
				'required' => 'Por favor, selecione o sexo',
				'in' => 'Por favor, selecione um valor válido',
			],
			'occupation.required' => 'Por favor, informe sua ocupação',
			'marital_status' => [
				'required' => 'Por favor, informe o estado civil',
				'in' => 'Por favor, selecione um valor válido',
			],
			'family_income' => [
				'required' => 'Por favor, informe a renda familiar',
				'in' => 'Por favor, selecione um valor válido',
			],
			'schooling' => [
				'required' => 'Por favor, informe seu nível de escolaridade',
				'in' => 'Por favor, selecione um valor válido',
			],
			'family_with_chronic_illnesses.required' => 'Por favor, informe se você ou seus familiares possuem alguma doença crônica',
			'family_with_psychiatric_disorders.required' => 'Por favor, informe se você ou seus familiares possuem algum transtorno psiquiátrico',
			'password.required' => 'Por favor, informe a senha',
			'password_confirmation' => [
				'required_with' => 'Por favor, confirme a nova senha',
				'same' => 'A senha e sua confirmação não correspondem',
			],
		];
	}
}
