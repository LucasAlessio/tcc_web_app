<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException as Exception;

class AuthorizationException extends Exception
{
    public function __construct($message = null, $code = null, \Throwable $previous = null)
	{
		parent::__construct($message ?? 'Você não possui permissão para executar esta ação.', $code, $previous);
	}
}
