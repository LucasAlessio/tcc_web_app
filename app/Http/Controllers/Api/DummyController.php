<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DummyController extends Controller
{
	/**
	 * Display the user's profile form.
	 */
	public function edit(Request $request)
	{
		throw ValidationException::withMessages([
			'tes'=> ['teste'],
		]);

		return $request->all();
	}
}
