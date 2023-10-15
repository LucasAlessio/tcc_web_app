<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\PatientRequest;
use App\Http\Requests\Api\ProfileUpdateRequest;
use App\Models\Patient;
use App\Models\Psychologist;
use App\Repositories\PatientsRepository;
use App\Services\TokenApiService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PatientsController extends Controller
{

	public function __construct(
		private PatientsRepository $repository,
		private TokenApiService $tokenService,
	)
	{ }

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(PatientRequest $request)
	{
		try {
			DB::beginTransaction();

			$data = $request->validated();
			
			$psychologist = Psychologist::where([
				'registration_number' => $data["psychologist_registration_number"],
			])->get(['id', 'user_id'])->first();

			if (!$psychologist) {
				throw ValidationException::withMessages([
					'psychologist_registration_number' => 'Psicólogo não encontrado',
				]);
			}

			$data["psychologist_id"] = $psychologist->user_id;

			$user = $this->repository->create($data);
			$tokenData = $this->tokenService->generateToken($user, $data["device_name"]);

			DB::commit();
			
			return response()->json($tokenData, Response::HTTP_CREATED);
		} catch (\Exception $e) {
			DB::rollBack();

			throw $e;
		}
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Request $request)
	{
		$user = $request->user();
		$user->load('patient.psychologist.psychologist');
		$user = $user->toArray();

		// $data = User::where([
		// 	'role' => 3,
		// ])
		// 	->whereHas('patient', function (Builder $query) {
		// 		$query->where(['psychologist_id' => 3]);
		// 	})
		// 	->get();

		// $user = array_merge($user, $user["patient"]);
		// unset($user["patient"]);

		// return $user;

		$response = array_filter($user, fn($key) => !in_array($key, [
			'role',
			'patient',
			'email_verified_at',
		]), ARRAY_FILTER_USE_KEY);

		$patient = array_filter(Arr::get($user, 'patient') ?? [], fn($key) => !in_array($key, [
			'id',
			'psychologist',
			'psychologist_id',
			'user_id',
		]), ARRAY_FILTER_USE_KEY) ?? [];

		$psychologist = [
			'psychologist_registration_number' => Arr::get($user, "patient.psychologist.psychologist.registration_number", ""),
		];

		$response = array_merge($response, $patient, $psychologist);

		foreach($response as $key => &$value) {
			if (in_array($key, ['family_income', 'schooling'])) {
				$value = (int) $value;
			}

			if (in_array($key, ['family_with_chronic_illnesses', 'family_with_psychiatric_disorders'])) {
				$value = (bool) $value;
			}

			continue;
		}

		return $response;
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(ProfileUpdateRequest $request)
	{
		$data = $request->validated();

		$psychologist = Psychologist::where([
			'registration_number' => $data["psychologist_registration_number"],
		])->get(['id', 'user_id'])->first();

		if (!$psychologist) {
			throw ValidationException::withMessages([
				'psychologist_registration_number' => 'Psicólogo não encontrado',
			]);
		}

		$data["psychologist_id"] = $psychologist->user_id;

		$user = $this->repository->update($request->user()->id, $data);

		if (!$user) {
			throw new NotFoundHttpException("Nenhum registro encontrado");
		}
		
		return $user;
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Patient $patients)
	{
		//
	}
}
