<?php

use Illuminate\Auth\Access\AuthorizationException as Exception;

class AuthorizationException extends Exception {

	public function __construct($message = null, $code = null, Throwable $previous = null)
	{
		parent::__construct($message ?? 'This action is unauthorized.', 0, $previous);

		$this->code = $code ?: 0;
	}
}
