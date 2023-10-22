<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveQuestionnairesToAnswer;
use App\Http\Requests\SaveQuestionnairesToAnswerRequest;
use App\Repositories\QuestionnairesControlsRepository;
use Illuminate\Http\Request;

class QuestionnairesControlsController extends Controller
{
	public function __construct(
		private QuestionnairesControlsRepository $repository,
	) { }

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit($id)
	{
		return $this->repository->getAll((int) $id);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(SaveQuestionnairesToAnswerRequest $request, $id)
	{
		return $this->repository->update((int) $id, $request->validated()["questionnaires"]);
	}
}
