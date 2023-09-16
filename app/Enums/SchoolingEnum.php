<?php

namespace App\Enums;

enum SchoolingEnum: int
{
	use getEnumValuesTrait;

	case INCOMPLETE_ELEMENTARY_EDUCATION = 1;
	case COMPLETE_PRIMARY_EDUCATION = 2;
	case INCOMPLETE_HIGH_SCHOOL = 3;
	case COMPLETE_HIGH_SCHOOL = 4;
	case INCOMPLETE_HIGHER_EDUCATION = 5;
	case COMPLETE_HIGHER_EDUCATION = 6;
	case POSTGRADUATE = 7;

}
