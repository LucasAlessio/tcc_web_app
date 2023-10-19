<?php

namespace App\Http\Controllers;

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
		return $this->repository->getAll(collect($request->all()));
	}

	/**
	 * Display the specified resource.
	 */
	public function show($id)
	{
		$patient = $this->repository->getById((int) $id);

		if (!$patient) {
			throw new NotFoundHttpException("Nenhum registro encontrado");
		}
	
		return $patient;
	}
}
