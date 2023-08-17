<?php

namespace App\Repositories;

use App\Models\Questionnaire;

interface QuestionnairesRepository {

	public function add(array $data): Questionnaire;

}
