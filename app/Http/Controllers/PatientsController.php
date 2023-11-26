<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\Patient;
use App\Repositories\PatientsRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PatientsController extends Controller
{
	public function __construct(
		private PatientsRepository $repository,
	) {}
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		$user = $request->user();
		$userId = $user->role != UserRole::ADMIN->value ? $user->id : null;

		return $this->repository->getAll(collect($request->all()), $userId);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Request $request, string $id)
	{
		$user = $request->user();
		$userId = $user->role != UserRole::ADMIN->value ? $user->id : null;

		$patient = $this->repository->getById((int) $id, $userId);

		if (!$patient) {
			throw new NotFoundHttpException("Nenhum registro encontrado.");
		}
	
		return $patient;
	}
}
