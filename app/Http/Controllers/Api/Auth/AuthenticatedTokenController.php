<?php

namespace App\Http\Controllers\Api\Auth;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\TokenApiService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class AuthenticatedTokenController extends Controller
{
	public function __construct(
		private TokenApiService $tokenService,
	) { }

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(FormRequest $request)
	{
		$request->validate([
			'email' => ['required', 'email'],
			'password' => 'required',
			'device_name' => ['required', 'string', 'max:32'],
		], [
			'email' => [
				'required' => 'Por favor, informe o e-mail',
				'email' => 'Por favor, informe um e-mail válido',
			],
			'password.required' => 'Por favor, informe a senha',
		]);
		
		$user = User::where([
			'email' => $request->email,
			'role' => UserRole::PATIENT->value,
		])->first();
		
		if (!$user || !Hash::check($request->password, $user->password)) {
			throw ValidationException::withMessages([
				'email' => ['As credenciais informadas estão incorretas'],
			]);
		}

		try {
			DB::beginTransaction();

			$user->tokens()->delete();
			
			$token = $this->tokenService->generateToken($user, $request->validated('device_name', 'UNKNOWN'));

			DB::commit();

			return $token;
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(FormRequest $request)
	{
		try {
			DB::beginTransaction();

			$user = $request->user();
			
			$token = $user->currentAccessToken();

			$user->tokens()->delete();

			$token = $this->tokenService->generateToken($user, $token->name);
			
			DB::commit();

			return $token;
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Request $request)
	{
		$request->user()->tokens()->delete();

		return response(null, Response::HTTP_NO_CONTENT);
	}
}
