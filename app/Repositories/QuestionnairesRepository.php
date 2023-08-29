<?php

namespace App\Repositories;

use App\Models\Questionnaire;
use Illuminate\Database\Eloquent\Collection;

interface QuestionnairesRepository {

	public function getAll(Collection $filters);

	public function getById(int $id);

	public function create(array $data): Questionnaire;

	public function update(int $id, array $data): Questionnaire;

}
