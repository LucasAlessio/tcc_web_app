<?php

namespace App\Listeners;

use App\Events\QuestionnaireAnswered;
use App\Repositories\NotificationsRepository;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotificationQuestionnaireAnswered
{
	/**
	 * Create the event listener.
	 */
	public function __construct(
		private NotificationsRepository $repository
	) { }

	/**
	 * Handle the event.
	 */
	public function handle(QuestionnaireAnswered $event): void
	{
		$this->repository->create([
			'user_id' => $event->user_id,
			'title' => $event->patient_name,
			'description' => "Novo envio de respostas para *{$event->questionnaire_name}*",
			'url' => "/pacientes/visualizar/{$event->patient_id}?tab=respostas",
		]);
	}
}
