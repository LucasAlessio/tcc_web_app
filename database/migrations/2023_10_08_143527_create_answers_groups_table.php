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
		Schema::create('answers_groups', function (Blueprint $table) {
			$table->id();
			$table->text('psychologist_comment')->nullable(true)->default(null);
			$table->unsignedBigInteger('questionnaire_id', false);
			$table->unsignedBigInteger('user_id', false);
			$table->foreign('questionnaire_id')->references('id')->on('questionnaires');
			$table->foreign('user_id')->references('id')->on('users');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('answers_groups');
	}
};
