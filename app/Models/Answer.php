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
		'comment',
		'question_id',
		'alternative_id',
		'answers_group_id',
	];

	public function question(): BelongsTo
	{
		return $this->belongsTo(Question::class, 'question_id');
	}

	public function alternative(): BelongsTo
	{
		return $this->belongsTo(Alternative::class, 'alternative_id');
	}

	public function group(): BelongsTo
	{
		return $this->belongsTo(AnswersGroup::class, 'answers_group_id');
	}
}
