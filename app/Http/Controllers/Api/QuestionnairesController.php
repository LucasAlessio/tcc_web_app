<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\QuestionnairesRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

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
		$questionnaires = $this->repository->getAllFromPatient(Auth::user()->id);

		return $questionnaires->map(function($value) {
			$questionnaire = $value->toArray();

			if (!$questionnaire["answerd_at"]) {
				return [
					...$questionnaire,
					"disabled" => false,
					"disabled_until" => null,
	
				];
			}

			$nextAnswer = Carbon::parse($questionnaire["answerd_at"]);
			$nextAnswer->addDays($questionnaire["recurrence"]);

			$disabled = time() < $nextAnswer->timestamp;
			$disabledUntil = null;

			if ($disabled) {
				$nextAnswer->ceilDay();
				$disabledUntil = $nextAnswer->format(\DateTime::ATOM);
			}

			return [
				...$questionnaire,
				"disabled" => $disabled,
				"disabled_until" => $disabledUntil,

			];
		});
	}

	/**
	 * Display the specified resource.
	 */
	public function show($id)
	{
		$questionnaire = $this->repository->getById((int) $id);

		return [
			...$questionnaire->toArray(),
			// "disabled" => true,
			// 	"disabled_until" => (new DateTime())->format(DateTime::ATOM),
		];
	}
}
