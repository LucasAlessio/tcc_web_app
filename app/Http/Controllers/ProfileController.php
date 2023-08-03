<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
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
		$request->user()->fill($request->validated());

		if ($request->user()->isDirty('email')) {
			$request->user()->email_verified_at = null;
		}

		$request->user()->save();

		return $request->user();
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
