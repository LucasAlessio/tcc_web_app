<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use App\Models\User;
use App\Repositories\QuestionnairesControlsRepository;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SaveQuestionnairesToAnswerRequest extends FormRequest
{
	public function __construct(
		private QuestionnairesControlsRepository $repository,
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
		$user = User::where([
			'role' => UserRole::PATIENT->value,
			'id' => (int) $this->route('id', -1),
		])->first();

		if (!$user) {
			throw new NotFoundHttpException('Nenhum paciente foi encontrado.');
		}

		return [
			'questionnaires' => ['required', 'array', function (string $attribute, mixed $value, Closure $fail) use($user) {
				if (!is_array($value)) {
					return $fail("invalid_value");
				}

				$user = $this->user();
				$userId = $user->role != UserRole::ADMIN->value ? $user->id : null;

				$questionnaires = $this->repository->getAll($user->id, $userId);
				$questionnaires = $questionnaires->toArray();

				$expected = array_map(fn($v) => $v["id"], $questionnaires);
				$received = array_map(fn($v) => $v["id"] ?? 0, $value);

				if (array_diff($expected, $received)) {
					return $fail("invalid_value");
				}
			}],
			'questionnaires.*.id' => ['required', 'integer'],
			'questionnaires.*.active' => ['required', 'boolean'],
		];
	}

	public function messages()
	{
		return [
			'name.required' => 'Por favor, informe o nome',
			'email.required' => 'Por favor, informe o e-mail',
			'email.email' => 'Por favor, informe um e-mail válido',
		];
	}
}
