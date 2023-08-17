<?php

namespace App\Providers;

use App\Repositories\EloquentQuestionnairesRepository;
use App\Repositories\QuestionnairesRepository;
use Illuminate\Support\ServiceProvider;

class RepositoriesProvider extends ServiceProvider
{
	public array $bindings = [
		QuestionnairesRepository::class => EloquentQuestionnairesRepository::class,
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
