<?php

namespace App\Repositories;

use App\Models\Notification;
use Carbon\Carbon;

class EloquentNotificationsRepository implements NotificationsRepository {

	public function hasNotifications(int $userId): bool {
		$query = Notification::query()
			->where([
				'user_id' => $userId,
				'viewed_at' => null,
			])
			->limit(1)
			->get('id');
		
		return !$query->isEmpty();
	}

	public function getUserNotifications(int $userId, bool $old = false): object {
		$query = Notification::query()
			->where([
				'user_id' => $userId,
			]);

		if ($old) {
			$query->whereNot('viewed_at', null, null);
		} else {
			$query->where('viewed_at', '=', null);
		}

		return $query->get();
	}
	
	public function create(array $data): Notification {
		return Notification::create($data);
	}

	public function archive(int $id): void {
		Notification::where(['id' => $id])
			->update(['viewed_at' => Carbon::now()]);
	}
}
