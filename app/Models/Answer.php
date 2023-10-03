<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Answer extends Model
{
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'questionnaire_id',
		'question_id',
		'alternative_id',
		'user_id',
		/**
		 * created_at adicionado para garantir que todas as respostas
		 * de um formulário tenham a mesma data de criação
		 */
		'created_at'
	];

	public function questionnaire(): BelongsTo
	{
		return $this->belongsTo(Questionnaire::class, 'questionnaire_id');
	}

	public function question(): BelongsTo
	{
		return $this->belongsTo(Question::class, 'question_id');
	}

	public function alternative(): BelongsTo
	{
		return $this->belongsTo(Alternative::class, 'alternative_id');
	}

	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class, 'user_id');
	}
}
