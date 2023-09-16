<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Patient extends Model
{
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'gender',
		'occupation',
		'marital_status',
		'family_income',
		'schooling',
		'family_with_chronic_illnesses',
		'family_with_psychiatric_disorders',
	];

	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class, 'user_id');
	}

	public function psychologist(): BelongsTo
	{
		return $this->belongsTo(Psychologists::class, 'user_id');
	}
}
