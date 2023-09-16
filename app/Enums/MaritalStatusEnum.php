<?php

namespace App\Enums;

enum MaritalStatusEnum: string
{
	use getEnumValuesTrait;

	case SINGLE = 'single';
	case MARRIED = 'married';
	case SEPARATED = 'separated';
	case DIVORCED = 'divorced';
	case WIDOWED = 'widowed';
}
