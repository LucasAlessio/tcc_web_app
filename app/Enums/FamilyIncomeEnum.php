<?php

namespace App\Enums;

enum FamilyIncomeEnum: int
{
	use getEnumValuesTrait;

	case UP_TO_3_MINIMUM_WAGES = 1;
	case FROM_4_TO_6_MINIMUM_WAGES = 2;
	case FROM_7_TO_11_MINIMUM_WAGES = 3;
	case ABOVE_11_MINIMUM_WAGES = 4;
}
