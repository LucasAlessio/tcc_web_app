<?php

namespace App\Http\Controllers;

use App\Http\Requests\PsychologistRequest;
use App\Models\Psychologist;
use App\Repositories\PsychologistsRepository;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PsychologistsController extends Controller
{
	public function __construct(
		private PsychologistsRepository $repository,
	) { }

	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		$this->authorize('index', Psychologist::class);

		return $this->repository->getAll(collect($request->all()));
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(PsychologistRequest $request)
	{
		$this->authorize('store', Psychologist::class);

		$user = $this->repository->create($request->all());

		event(new Registered($user));

		return $user;
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit($id)
	{
		$this->authorize('edit', Psychologist::class);

		$user = $this->repository->getById((int) $id);
	
		if (!$user) {
			throw new NotFoundHttpException("Nenhum registro encontrado.");
		}
	
		return $user;
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(PsychologistRequest $request, $id)
	{
		$this->authorize('update', Psychologist::class);

		$user = $this->repository->update((int) $id, $request->validated());

		if (!$user) {
			throw new NotFoundHttpException("Nenhum registro encontrado.");
		}
		
		return $user;
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy($id)
	{
		$this->authorize('destroy', Psychologist::class);

		if (!$this->repository->delete((int) $id)) {
			throw new HttpException(Response::HTTP_INTERNAL_SERVER_ERROR, "Não foi possível excluir o registro.");
		}
	}
}
