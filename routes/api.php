<?php

use App\Http\Controllers\Api\PatientsController;
use App\Http\Controllers\Api\QuestionnairesController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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

Route::post('/patients', [PatientsController::class, 'store']);

Route::get('/questionnaires', [QuestionnairesController::class, 'index']);
Route::get('/questionnaires/{id}', [QuestionnairesController::class, 'show']);

Route::get('/*', function() {
	throw new NotFoundHttpException('Page not found');
});
