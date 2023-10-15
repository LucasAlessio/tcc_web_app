<?php

use App\Http\Controllers\Api\AnswersController;
use App\Http\Controllers\Api\Auth\AuthenticatedTokenController;
use App\Http\Controllers\Api\PatientsController;
use App\Http\Controllers\Api\QuestionnairesController;
use App\Http\Controllers\Auth\PasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
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

Route::post('/login', [AuthenticatedTokenController::class, 'store']);

Route::group(['middleware' => ['auth:sanctum']], function() {
	Route::get('/profile', [PatientsController::class, 'show']);
	Route::post('/profile', [PatientsController::class, 'update']);
	Route::put('/password', [PasswordController::class, 'update']);

	Route::post('/refresh', [AuthenticatedTokenController::class, 'update']);
	Route::post('/logout', [AuthenticatedTokenController::class, 'destroy']);
	
	Route::get('/questionnaires', [QuestionnairesController::class, 'index']);
	Route::get('/questionnaires/{id}', [QuestionnairesController::class, 'show']);
	Route::post('/questionnaires/{id}/answer', [AnswersController::class, 'store']);
});

Route::post('/register', [PatientsController::class, 'store']);


Route::any('/{path?}', function(){
	return response()->json(['message' => 'Rota não encontrada'], Response::HTTP_NOT_FOUND);
})->where('path', '.*');
