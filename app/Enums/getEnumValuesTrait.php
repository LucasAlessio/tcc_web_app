<?php

namespace App\Enums;

trait getEnumValuesTrait {

	static function getValues(): array {
		return array_column(self::cases(), 'value');
	}

}
