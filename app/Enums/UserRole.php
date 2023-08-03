<?php

namespace App\Enums;

enum UserRole: int
{
	case ADMIN = 1;
	case PSYCHOLOGIST = 2;
	case PATIENT = 3;
}
