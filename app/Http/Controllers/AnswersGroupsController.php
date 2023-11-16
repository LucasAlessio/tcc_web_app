<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnswersGroupRequest;
use App\Repositories\AnswersGroupsRepository;

class AnswersGroupsController extends Controller
{
	public function __construct(
		private AnswersGroupsRepository $repository,
	) { }
	/**
	 * Display a listing of the resource.
	 */
	public function index($id)
	{
		return $this->repository->getAll((int) $id);
	}

	/**
	 * Display the specified resource.
	 */
	public function show($id)
	{
		return $this->repository->getById((int) $id);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(AnswersGroupRequest $request, $id)
	{
		$this->repository->update(intval($id), $request->validated());
	}
}
