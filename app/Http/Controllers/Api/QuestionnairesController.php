<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Questionnaire;
use App\Repositories\QuestionnairesRepository;
use Illuminate\Http\Request;

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
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request)
	{
		//
	}

	/**
	 * Display the specified resource.
	 */
	public function show($id)
	{
		return $this->repository->getById((int) $id);
	}
}
