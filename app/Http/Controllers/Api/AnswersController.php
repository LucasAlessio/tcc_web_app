<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AnswerRequest;
use App\Models\AnswersGroup;
use App\Repositories\QuestionnairesRepository;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AnswersController extends Controller
{
	public function __construct(
		private QuestionnairesRepository $repository,
	) { }

	/**
	 * Store a newly created resource in storage.
	 */
	public function store($id, AnswerRequest $request)
	{
		$validated = $request->validated();

		$answers = array_map(fn($value) => [
			'comment' => $value["comment"] ?? null,
			'question_id' => $value["id"],
			'alternative_id' => $value["alternative"] ?? null,
		], $validated["questions"]);

		try {
			DB::beginTransaction();

			$group = AnswersGroup::create([
				'questionnaire_id' => $id,
				'user_id' => $request->user()->id,
			]);

			$group->answers()->createMany($answers);

			DB::commit();

			return response([
				'group' => $group->id,
			], Response::HTTP_CREATED);
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}
}
