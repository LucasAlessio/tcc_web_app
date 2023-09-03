<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/sanctum/token', function (Request $request) {
	$request->validate([
		'email' => 'required|email',
		'password' => 'required',
	]);
	
	$user = User::where('email', $request->email)->first();
	
	if (!$user || !Hash::check($request->password, $user->password)) {
		throw ValidationException::withMessages([
			'email' => ['As credenciais informadas estão incorretas'],
		]);
	}
	
	$expires_at = (new \DateTime('now'))->modify(config('sanctum.expiration', 10080) . ' minutes');
	$token = $user->createToken($request->device_name, ["*"], $expires_at);

	return [
		'token' => $token->plainTextToken,
		'expires_at' => $token->accessToken->expires_at,
	];
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
	return $request->user();
});
