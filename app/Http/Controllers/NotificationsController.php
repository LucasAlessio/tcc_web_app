<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Repositories\NotificationsRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class NotificationsController extends Controller
{
	public function __construct(
		private NotificationsRepository $repository,
	) { }

	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		return $this->repository->getUserNotifications($request->user()->id, collect($request->all()));
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
	public function store(Request $request)
	{
		//
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Notification $notification)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Notification $notification)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Notification $notification)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy($id)
	{
		$this->repository->archive($id);
	}
}
