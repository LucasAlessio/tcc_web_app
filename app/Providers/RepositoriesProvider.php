<?php

namespace App\Providers;

use App\Repositories\EloquentPatientsRepository;
use App\Repositories\EloquentPsychologistsRepository;
use App\Repositories\EloquentQuestionnairesControlsRepository;
use App\Repositories\EloquentQuestionnairesRepository;
use App\Repositories\EloquentUsersRepository;
use App\Repositories\PatientsRepository;
use App\Repositories\PsychologistsRepository;
use App\Repositories\QuestionnairesControlsRepository;
use App\Repositories\QuestionnairesRepository;
use App\Repositories\UsersRepository;
use Illuminate\Support\ServiceProvider;

class RepositoriesProvider extends ServiceProvider
{
	public array $bindings = [
		UsersRepository::class => EloquentUsersRepository::class,
		PsychologistsRepository::class => EloquentPsychologistsRepository::class,
		QuestionnairesRepository::class => EloquentQuestionnairesRepository::class,
		PatientsRepository::class => EloquentPatientsRepository::class,
		QuestionnairesControlsRepository::class => EloquentQuestionnairesControlsRepository::class,
	];

	/**
	 * Register services.
	 */
	public function register(): void
	{
		// $this->app->bind(QuestionnaireRepository::class, EloquentQuestionnaireRepository::class);
	}

	/**
	 * Bootstrap services.
	 */
	public function boot(): void
	{
		//
	}
}
