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
		Schema::create('answers', function (Blueprint $table) {
			$table->id();
			$table->text('comment')->nullable(true)->default(null);
			$table->unsignedBigInteger('question_id', false);
			$table->unsignedBigInteger('alternative_id', false)->nullable(true)->default(null);
			$table->unsignedBigInteger('answers_group_id', false);
			$table->foreign('question_id')->references('id')->on('questions');
			$table->foreign('alternative_id')->references('id')->on('alternatives');
			$table->foreign('answers_group_id')->references('id')->on('answers_groups');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('answers');
	}
};
