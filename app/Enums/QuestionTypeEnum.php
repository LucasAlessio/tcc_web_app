<?php

namespace App\Enums;

enum QuestionTypeEnum: int
{
	case SHORT_TEXT = 1;
	case LONG_TEXT = 2;
	case CHOICE = 3;
	case MULTIPLE_CHOICE = 4;
}
