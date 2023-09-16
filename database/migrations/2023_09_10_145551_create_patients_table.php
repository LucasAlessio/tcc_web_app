<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('patients', function (Blueprint $table) {
			$table->id();
			$table->enum('gender', \App\Enums\GenderEnum::getValues());
			$table->string('occupation');
			$table->enum('marital_status', \App\Enums\MaritalStatusEnum::getValues());
			$table->enum('family_income', \App\Enums\FamilyIncomeEnum::getValues());
			$table->enum('schooling', \App\Enums\SchoolingEnum::getValues());
			$table->boolean('family_with_chronic_illnesses');
			$table->boolean('family_with_psychiatric_disorders');
			$table->unsignedBigInteger('user_id', false);
			$table->foreign('user_id', 'patients_user_id_foreign')->references('id')->on('users');
			$table->unsignedBigInteger('psychologist_id', false);
			$table->foreign('psychologist_id', 'patients_psychologist_id_foreign')->references('id')->on('users');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('patients');
	}
};
