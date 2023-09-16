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
		Schema::table('psychologists', function(Blueprint $table) {
			$table->unique(['registration_number'], 'uk_registration_number');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::table('psychologists', function(Blueprint $table) {
			$table->dropIndex('uk_registration_number');
		});
	}
};
