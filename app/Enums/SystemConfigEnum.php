<?php

namespace App\Enums;

enum SystemConfigEnum: string
{
	use getEnumValuesTrait;

	case PAGE_LIMIT_DEFAULT = "25";
}
