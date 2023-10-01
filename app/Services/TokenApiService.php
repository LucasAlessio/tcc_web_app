<?php

namespace App\Services;

use App\Models\User;

class TokenApiService {

	private const DEFAULT_EXPIRATION_MINUTES = 10080;

	public static function generateToken(User $user, string $deviceName): array {
		$expiresAt = (new \DateTime('now'))->modify(config('sanctum.expiration', self::DEFAULT_EXPIRATION_MINUTES) . ' minutes');

		if (empty($user->id)) {
			throw new \Exception('Usuário inválido');
		}

		$token = $user->createToken($deviceName, ["*"], $expiresAt);

		return [
			'user' => $user,
			'token' => $token->plainTextToken,
			'expires_at' => $token->accessToken->expires_at,
		];
	}

}
