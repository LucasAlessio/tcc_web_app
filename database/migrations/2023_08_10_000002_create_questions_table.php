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
		Schema::create('questions', function (Blueprint $table) {
			$table->id();
			$table->text('description');
			$table->enum('type', array_column(\App\Enums\QuestionTypeEnum::cases(), 'value'))->default(\App\Enums\QuestionTypeEnum::CHOICE->value);
			$table->unsignedTinyInteger('posicao');
			$table->unsignedBigInteger('questionnaire_id', false);
			$table->foreign('questionnaire_id')->references('id')->on('questionnaires');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('questions');
	}
};
