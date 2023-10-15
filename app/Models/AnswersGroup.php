<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AnswersGroup extends Model
{
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'psychologist_comment',
		'questionnaire_id',
		'user_id',
	];

	public function questionnaire(): BelongsTo
	{
		return $this->belongsTo(Questionnaire::class, 'questionnaire_id');
	}

	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class, 'user_id');
	}

	public function answers(): HasMany
	{
		return $this->hasMany(Answer::class, 'answers_group_id');
	}
	
}
