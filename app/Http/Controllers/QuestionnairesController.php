<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuestionnaireRequest;
use App\Models\Questionnaire;
use App\Repositories\EloquentQuestionnairesRepository;
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
		//
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(QuestionnaireRequest $request)
	{
		return $this->repository->add(array_merge($request->all(), [
			"user_id" => $request->user()->id,
		]));
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Questionnaire $questionnaire)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Questionnaire $questionnaire)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Questionnaire $questionnaire)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Questionnaire $questionnaire)
	{
		//
	}
}
