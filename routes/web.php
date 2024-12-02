<?php

use App\Http\Controllers\AnswersGroupsController;
use App\Http\Controllers\PatientsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ExportAnswersController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PsychologistsController;
use App\Http\Controllers\QuestionnairesController;
use App\Http\Controllers\QuestionnairesControlsController;
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

		Route::get('/patients', [PatientsController::class, 'index'])->name('patients.index');
		Route::get('/patients/{id}', [PatientsController::class, 'show'])->name('patients.show');

		Route::get('/questionnaires-controls/{id}', [QuestionnairesControlsController::class, 'edit'])->name('questionnaires.controls.edit');

		Route::get('/answers-groups/{id}', [AnswersGroupsController::class, 'index'])->name('answers.groups.index');
		Route::get('/answers-group/{id}', [AnswersGroupsController::class, 'show'])->name('answers.groups.show');

		Route::get('/notifications', [NotificationsController::class, 'index'])->name('notifications.index');
		Route::delete('/notifications/{id}', [NotificationsController::class, 'destroy'])->name('notifications.destroy');
	});

	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

	Route::post('/psychologists', [PsychologistsController::class, 'store'])->name('psychologists.store');
	Route::put('/psychologists/{id}', [PsychologistsController::class, 'update'])->name('psychologists.update');
	Route::delete('/psychologists/{id}', [PsychologistsController::class, 'destroy'])->name('psychologists.destroy');

	Route::post('/questionnaires', [QuestionnairesController::class, 'store'])->name('questionnaires.store');
	Route::put('/questionnaires/{questionnaire}', [QuestionnairesController::class, 'update'])->name('questionnaires.update');
	Route::delete('/questionnaires/{questionnaire}', [QuestionnairesController::class, 'destroy'])->name('questionnaires.destroy');

	Route::post('/questionnaires-controls/{id}', [QuestionnairesControlsController::class, 'update'])->name('questionnaires.controls.update');

	Route::post('/export-answers', [ExportAnswersController::class, 'store'])->name('export.answers.store');
	Route::get('/export-answers', [ExportAnswersController::class, 'show'])->name('export.answers.show');

	Route::patch('/answers-group/{group}', [AnswersGroupsController::class, 'update'])->name('answers.groups.update');
});

Route::get('/{path?}', function () {
	return Inertia::render('app', [
		'laravelVersion' => Application::VERSION,
		'phpVersion' => PHP_VERSION,
	]);
})->where('path', '.*');

Route::middleware('auth')->group(function () {});


require __DIR__.'/auth.php';
