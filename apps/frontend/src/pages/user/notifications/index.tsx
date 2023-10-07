import { Container } from '#/fe/shared/components/container';
import { NotificationItem } from '#/fe/shared/components/notification-item';
import { Skeleton } from '#/fe/shared/components/ui/skeleton';
import { getUserNotifications } from '#/fe/shared/services/api';
import { Notification } from '#/fe/shared/services/api-types';
import { useLoggedUser } from '#/fe/shared/state/logged-user';
import { useQuery } from '@tanstack/react-query';

export default function UserNotificationListPage() {
	const loggedUser = useLoggedUser();

	const { data: notifications, isLoading } = useQuery(
		['notifications'],
		() => {
			return getUserNotifications();
		},
		{ enabled: !!loggedUser?.id },
	);

	if (isLoading) {
		return <Skeleton />;
	}

	return (
		<Container className="flex flex-col gap-4">
			{notifications?.items.map((notification: Notification) => (
				<NotificationItem
					key={notification.id}
					notification={notification}
					refetchNotifications={() => {}}
				/>
			))}
		</Container>
	);
}
