<?php

namespace App\Enums;

enum GenderEnum: string
{
	use getEnumValuesTrait;
	
	case MALE = "male";
	case FEMALE = "female";
}
