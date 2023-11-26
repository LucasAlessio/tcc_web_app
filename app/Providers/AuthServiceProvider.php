<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Psychologist;
use App\Models\Questionnaire;
use App\Policies\PsychologistPolicy;
use App\Policies\QuestionnairePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
	/**
	 * The model to policy mappings for the application.
	 *
	 * @var array<class-string, class-string>
	 */
	protected $policies = [
		Questionnaire::class => QuestionnairePolicy::class,
		Psychologist::class => PsychologistPolicy::class,
	];

	/**
	 * Register any authentication / authorization services.
	 */
	public function boot(): void
	{
		//
	}
}
