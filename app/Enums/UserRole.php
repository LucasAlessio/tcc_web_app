<?php

namespace App\Enums;

enum UserRole: int
{
	use getEnumValuesTrait;

	case ADMIN = 1;
	case PSYCHOLOGIST = 2;
	case PATIENT = 3;

}
