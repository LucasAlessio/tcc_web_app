<?php

namespace App\Http\Middleware;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
	/**
	 * Get the path the user should be redirected to when they are not authenticated.
	 */
	protected function redirectTo(Request $request): ?string
	{
		return $request->expectsJson() ? null : route('login');
	}

	/**
	 * Handle an unauthenticated user.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  array  $guards
	 * @return void
	 *
	 * @throws \Illuminate\Auth\AuthenticationException
	 */
	protected function unauthenticated($request, array $guards)
	{
		throw new AuthenticationException(
			$request->is('api/*') ? 'Authorization Token inválido' : 'Sua sessão expirou. Atualize a página e faça login novamente para continuar.',
			$guards,
			$request->expectsJson() ? null : $this->redirectTo($request)
		);
	}
}
