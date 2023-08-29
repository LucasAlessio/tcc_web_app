<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Question extends Model
{
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'description',
		'type',
		'position',
	];

	public function questionnaire(): BelongsTo
	{
		return $this->belongsTo(Questionnaire::class, 'questionnaire_id');
	}

	public function alternatives(): HasMany
	{
		return $this->hasMany(Alternative::class, 'question_id');
	}

	protected static function booted(): void
	{
		static::addGlobalScope('order', function (Builder $builder) {
			$builder
				->orderBy('position', 'ASC')
				->orderBy('id', 'DESC');
		});
	}
}
