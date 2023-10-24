<?php

namespace App\Http\Controllers;

use App\Repositories\AnswersGroupsRepository;

class AnswersGroupsController extends Controller
{
	public function __construct(
		private AnswersGroupsRepository $respository,
	) { }
	/**
	 * Display a listing of the resource.
	 */
	public function index($id)
	{
		return $this->respository->getAll((int) $id);
	}

	/**
	 * Display the specified resource.
	 */
	public function show($id)
	{
		return $this->respository->getById((int) $id);
	}
}
