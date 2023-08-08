<?php

namespace App\Http\Controllers;

use App\Enums\SystemConfigEnum;
use App\Enums\UserRole;
use App\Http\Requests\PsychologistRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PsychologistsController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		$query = User::where('role', UserRole::PSYCHOLOGIST->value);

		if ($request->filled("search")) {
			$query->where("name", "like", '%' . (string) $request->query("search") . '%');
		}

		return $query->paginate($request->integer("limit", SystemConfigEnum::PAGE_LIMIT_DEFAULT));
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(PsychologistRequest $request)
	{
		$user = User::create(array_merge($request->all(), [
			'password' => Hash::make($request->password),
			'role' => UserRole::PSYCHOLOGIST->value,
		]));

		event(new Registered($user));

		return $user;
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit($id)
	{
		$user = User::where([
			'role' => UserRole::PSYCHOLOGIST->value,
			'id' => $id,
		])->first();
	
		if (!$user) {
			throw new NotFoundHttpException("Nenhum registro encontrado");
		}
	
		return $user;
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(PsychologistRequest $request, $id)
	{
		$user = User::where([
			'role' => UserRole::PSYCHOLOGIST->value,
			'id' => $id,
		])->update(array_filter(
			array_merge($request->validated(), [
				'password' => $request->filled('password') ? Hash::make($request->password) : null,
			])
		));

		if (!$user) {
			throw new NotFoundHttpException("Nenhum registro encontrado");
		}
		
		return $user;
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy($id)
	{
		$user = User::where([
			'role' => UserRole::PSYCHOLOGIST->value,
			'id' => $id,
		]);

		if (!$user->count()) {
			throw new NotFoundHttpException("Nenhum registro encontrado");
		}

		$user->delete();
	}
}
