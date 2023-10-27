<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
// use Inertia\Response;

class ProfileController extends Controller
{
	/**
	 * Display the user's profile form.
	 */
	public function edit(Request $request)
	{
		// return Inertia::render('Profile/Edit', [
		// 	'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
		// 	'status' => session('status'),
		// ]);
	}

	/**
	 * Update the user's profile information.
	 */
	public function update(ProfileUpdateRequest $request)
	{
		$user = $request->user();
		$user->fill($request->validated());

		
		if ($user->isDirty('email')) {
			$user->email_verified_at = null;
		}
		
		try {
			DB::beginTransaction();

			$user->save();
			
			if ($user->role == UserRole::PSYCHOLOGIST->value) {
				$user->psychologist()->updateOrCreate([], $request->validated()["psychologist"]);
			}

			DB::commit();

			if ($user->role != UserRole::PSYCHOLOGIST->value) {
				return $user;
			}
			
			return $user->load('psychologist');
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}

	/**
	 * Delete the user's account.
	 */
	public function destroy(Request $request): void
	{
		$request->validate([
			'password' => ['required', 'current_password'],
		], [
			'password.required' => 'Por favor, informe a senha',
			'password.current_password' => 'A senha informada é invalida'
		]);

		$user = $request->user();

		Auth::logout();

		$user->delete();

		$request->session()->invalidate();
		$request->session()->regenerateToken();

		// return Redirect::to('/');
	}
}
