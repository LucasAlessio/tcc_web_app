<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Repositories\NotificationsRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
	public function __construct(
		private NotificationsRepository $repository,
	) {	}

	/**
	 * Get indentity
	 */
	public function index(Request $request): array {
		$user = $request->user();

		if ($user->role == UserRole::PSYCHOLOGIST->value) {
			$user->load('psychologist');
		}

		return [
			'auth' => [
				'user' => $user,
				'hasNotifications' => $this->repository->hasNotifications($user->id),
			],
		];
	}

	/**
	 * Display the login view.
	 */
	// public function create(): Response
	// {
	// 	return Inertia::render('Auth/Login', [
	// 		'canResetPassword' => Route::has('password.request'),
	// 		'status' => session('status'),
	// 	]);
	// }

	/**
	 * Handle an incoming authentication request.
	 */
	public function store(LoginRequest $request)
	{
		$request->authenticate();

		$request->session()->regenerate();

		return $this->index($request);
		// return redirect()->intended(RouteServiceProvider::HOME);
	}

	/**
	 * Destroy an authenticated session.
	 */
	public function destroy(Request $request): void
	{
		Auth::guard('web')->logout();

		$request->session()->invalidate();

		$request->session()->regenerateToken();
	}
}
