<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\QuestionnairesRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class QuestionnairesController extends Controller
{
	public function __construct(
		private QuestionnairesRepository $repository,
	) { }

	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		return $this->repository->getAllFromPatient();
	}

	/**
	 * Display the specified resource.
	 */
	public function show($id)
	{
		return $this->repository->getById((int) $id);
	}
}
