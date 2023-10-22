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
        Schema::create('patients_questionnaires', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id', false);
            $table->unsignedBigInteger('questionnaire_id', false);
            $table->foreign('user_id')->references('id')->on('users');
			$table->foreign('questionnaire_id')->references('id')->on('questionnaires');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients_questionnaires');
    }
};
