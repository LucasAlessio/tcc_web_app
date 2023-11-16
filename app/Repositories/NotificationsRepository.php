<?php

namespace App\Repositories;

use App\Models\Notification;
use Illuminate\Support\Collection;

interface NotificationsRepository {

	public function hasNotifications(int $userId): bool;

	public function getUserNotifications(int $userId, ?Collection $filters = null): object;

	public function create(array $data): Notification;

	public function archive(int $id): void;

	// public function update(int $id, array $data): User;

}
