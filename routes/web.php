<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
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

Route::group(['prefix' => 'get'], function() {
	Route::get('/identity', [AuthenticatedSessionController::class, 'index'])->name('profile');
	
	Route::group(['middleware' => 'auth'], function() {
		// Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	});
});

Route::group(['middleware' => 'auth'], function() {
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/{path?}', function () {
	return Inertia::render('app', [
		// 'canLogin' => Route::has('login'),
		// 'canRegister' => Route::has('register'),
		'laravelVersion' => Application::VERSION,
		'phpVersion' => PHP_VERSION,
	]);
})->where('path', '.*');

Route::middleware('auth')->group(function () {});


require __DIR__.'/auth.php';
