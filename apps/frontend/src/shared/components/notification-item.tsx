import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { toast } from 'react-toastify';
import { readNotification } from '../services/api';
import { Notification } from '../services/api-types';
import { useJwtToken } from '../state/logged-user';

type NotificationItemProps = {
	notification: Notification;
	refetchNotifications: () => void;
};

export const NotificationItem: FC<NotificationItemProps> = ({
	notification,
	refetchNotifications,
}) => {
	const jwtToken = useJwtToken();
	const isUnread = notification.status === 'Unread';

	const markAsReadMtt = useMutation(
		async () => {
			if (!jwtToken) return;

			return await readNotification(jwtToken, notification.id);
		},
		{
			onSuccess: () => {
				toast.success('Notificação marcada como lida');
				refetchNotifications();
			},
			onError: (error: any) => {
				toast.error(
					`Falha ao marcar notificação como lida: ${error.message}`,
				);
			},
		},
	);

	return (
		<div
			className={`flex items-center px-4 py-2 border border-gray-200 rounded-md ${
				isUnread ? 'bg-gray-100' : ''
			}`}
		>
			<div
				className={`flex-shrink-0 w-6 h-6 rounded-full mr-4 ${
					isUnread ? 'bg-green-500' : 'bg-gray-500'
				}`}
			/>
			<div className="flex-grow">
				<p className="text-sm font-medium text-gray-900">
					{notification.message}
				</p>
				<p className="text-xs text-gray-500">
					{new Date(notification.createdAt).toLocaleString()}
				</p>
			</div>
			{isUnread && (
				<button
					onClick={() => markAsReadMtt.mutate()}
					className="text-sm font-medium text-gray-500 hover:text-gray-700 ml-4"
					disabled={markAsReadMtt.isLoading}
				>
					Mark as read
				</button>
			)}
		</div>
	);
};
