<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
	use HasApiTokens, HasFactory, Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'name',
		'email',
		'password',
		'role',
	];

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var array<int, string>
	 */
	protected $hidden = [
		'password',
		'remember_token',
	];

	/**
	 * The attributes that should be cast.
	 *
	 * @var array<string, string>
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
		'password' => 'hashed',
	];

	public function questionnaires(): HasMany
	{
		return $this->hasMany(Questionnaire::class, 'user_id');
	}

	public function psychologist(): HasOne
	{
		return $this->hasOne(Psychologist::class, 'user_id');
	}

	public function patient(): HasOne
	{
		return $this->hasOne(Patient::class, 'user_id');
	}

	// public function patients(): HasMany
	// {
	// 	return $this->hasMany(Patient::class, 'psychologist_id');
	// }

	public function questionnairesToAnswer(): BelongsToMany
	{
		return $this->belongsToMany(Questionnaire::class, 'patients_questionnaires', 'user_id', 'questionnaire_id')->withTimestamps();
	}
}
