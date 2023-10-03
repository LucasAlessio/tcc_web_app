<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PsychologistsController;
use App\Http\Controllers\QuestionnairesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::view('/{path?}', 'app')->where('path', '.*');

Route::group(['middleware' => 'auth'], function() {
	Route::group(['prefix' => 'get'], function() {
		Route::get('/identity', [AuthenticatedSessionController::class, 'index'])->name('profile');
		
		Route::get('/psychologists', [PsychologistsController::class, 'index'])->name('psychologists.index');
		Route::get('/psychologists/{id}', [PsychologistsController::class, 'edit'])->name('psychologists.edit');

		Route::get('/questionnaires', [QuestionnairesController::class, 'index'])->name('questionnaires.index');
		Route::get('/questionnaires/{id}', [QuestionnairesController::class, 'edit'])->name('questionnaires.edit');
	});

	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

	Route::post('/psychologists', [PsychologistsController::class, 'store'])->name('psychologists.store');
	Route::put('/psychologists/{id}', [PsychologistsController::class, 'update'])->name('psychologists.update');
	Route::delete('/psychologists/{id}', [PsychologistsController::class, 'destroy'])->name('psychologists.destroy');

	Route::post('/questionnaires', [QuestionnairesController::class, 'store'])->name('questionnaires.store');
	Route::put('/questionnaires/{id}', [QuestionnairesController::class, 'update'])->name('questionnaires.update');
});

Route::get('/{path?}', function () {
	return Inertia::render('app', [
		'laravelVersion' => Application::VERSION,
		'phpVersion' => PHP_VERSION,
	]);
})->where('path', '.*');

Route::middleware('auth')->group(function () {});


require __DIR__.'/auth.php';
