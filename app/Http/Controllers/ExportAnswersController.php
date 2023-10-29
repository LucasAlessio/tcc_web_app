<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterAnswersRequest;
use App\Repositories\AnswersGroupsRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ExportAnswersController extends Controller
{
	public function __construct(
		private AnswersGroupsRepository $repository,
	) { }

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(FilterAnswersRequest $request)
	{
		$groups = $this->repository->getToExport(collect($request->validated()));

		if (!$groups->count()) {
			return response(null, Response::HTTP_NO_CONTENT);
		}

		$filename = $this->generateFile($groups, $request->validated("format"), $request->validated("withPatientsData"));

		return $filename;
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Request $request)
	{
		$filename = basename($request->get('name', ''));
		$path = "answers" . DIRECTORY_SEPARATOR . $filename;
		
		if (empty($filename) || strpos($filename, '..') !== false || !Storage::exists($path)) {
			throw new NotFoundHttpException('Arquivo não encontrado');
		}


		$content = file_get_contents(Storage::path($path));
		Storage::delete($path);

		return response($content, Response::HTTP_OK, [
			"Content-Type" => "application/csv;charset=UTF-8",
			"Content-Disposition" => "attachment; filename={$filename}",
		]);
	}

	private function generateFile(object $groups, string $format, bool $withPatientsData) {
		if (!Storage::exists('answers')) {
			Storage::makeDirectory('answers');
		}

		$filename = "export_" . date("Y-m-d\THis") . '.csv';
		$fp = fopen(Storage::path('answers' . DIRECTORY_SEPARATOR . $filename), 'w');

		$rows = $this->getRows($groups, $format, $withPatientsData);

		foreach($rows as $row) {
			fputcsv($fp, $row);
		}

		fclose($fp);

		return $filename;
	}

	private function getRows(object $groups, string $format, bool $withPatientsData) {
		$data = $this->prepareData($groups, $format, $withPatientsData);

		$rows = [$this->getHeader($groups, $format, $withPatientsData)];

		foreach ($data as $user) {
			$row = [$user["user_id"]];

			foreach($user["groups"] as $answers) {
				foreach($answers as $answer) {
					$row[] = $answer->alternative->value ?? null;
				}
			}

			if ($withPatientsData && !is_null($user["patientData"])) {
				$patient = $user["patientData"];

				$row = array_merge($row, [
					$patient->gender,
					$patient->occupation,
					$patient->marital_status,
					$patient->family_income,
					$patient->schooling,
					$patient->family_with_chronic_illnesses,
					$patient->family_with_psychiatric_disorders,
				]);
			}

			$rows[] = $row;
		}

		return $rows;
	}

	private function getHeader(object $groups, string $format, bool $withPatientsData) {
		$header = ["Usuário"];

		foreach($groups as $key => $group) {
			foreach($group->answers as $answer) {
				if ($format == "columns") {
					$header[] = "{$key}:{$answer->question_id}";
				} else {
					$header[] = "{$answer->question_id}";
				}
			}

			if ($format != "columns") {
				break;
			}
		}

		if ($withPatientsData) {
			$header = array_merge($header, [
				'Sexo',
				'Ocupação',
				'Estado civil',
				'Renda familiar',
				'Escolaridade',
				'Possui histórico de doenças crônicas',
				'Possui histórico de doenças psiquiátricas',
			]);
		}

		return $header;
	}

	private function prepareData(object $groups, string $format, bool $withPatientsData): array {
		$data = [];

		if ($format == "columns") {
			foreach($groups as $group) {
				$index = $group->user_id;

				if (!isset($data[$index])) {
					$data[$index] = [
						'user_id' => $group->user_id,
						'groups' => [$group->answers],
						'patientData' => $withPatientsData ? ($group->user->patient ?? null) : null,
					];
				} else {
					$data[$index]["groups"][] = $group->answers;
				}
			}

			return $data;
		}

		foreach($groups as $group) {
			$data[] = [
				'user_id' => $group->user_id,
				'groups' => [$group->answers],
				'patientData' => $withPatientsData ? ($group->user->patient ?? null) : null,
			];
		}

		return $data;
	}
}
