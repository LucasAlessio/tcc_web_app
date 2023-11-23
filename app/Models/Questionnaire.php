<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Questionnaire extends Model
{
	use HasFactory, SoftDeletes;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'name',
		'description',
		'recurrence',
		'user_id',
	];

	public function questions(): HasMany
	{
		return $this->hasMany(Question::class, 'questionnaire_id');
	}

	public function psychologist(): BelongsTo
	{
		return $this->belongsTo(User::class, 'user_id');
	}
}
