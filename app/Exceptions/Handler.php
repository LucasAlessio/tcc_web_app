<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Throwable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
	/**
	 * The list of the inputs that are never flashed to the session on validation exceptions.
	 *
	 * @var array<int, string>
	 */
	protected $dontFlash = [
		'current_password',
		'password',
		'password_confirmation',
	];

	/**
	 * Register the exception handling callbacks for the application.
	 */
	public function register(): void
	{
		$this->reportable(function (Throwable $e) {
			//
		});

		$this->renderable(function (Throwable $e) {
			if ($e instanceof ValidationException) {
				// return response()->json($e->errors(), $e->status);
			}

			if ($e->getPrevious() instanceof ModelNotFoundException) {
				throw new NotFoundHttpException('[404] Registro não encontrado.');
			}
		});
	}

	/**
     * Convert an authentication exception into a response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    // protected function unauthenticated($request, AuthenticationException $exception)
    // {
    //     return $this->shouldReturnJson($request, $exception)
    //                 ? response()->json(['message' => $exception->getMessage()], 401)
    //                 : redirect()->guest($exception->redirectTo() ?? route('login'));
    // }
}
