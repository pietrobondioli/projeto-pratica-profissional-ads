import { useQuery } from '@tanstack/react-query';
import { getMe } from '../services/api';
import { useLoggedUserId } from '../state/logged-user';

export function useLoggedUser() {
	const userId = useLoggedUserId();

	const { data: user } = useQuery(
		['user', userId],
		() => {
			return getMe();
		},
		{
			cacheTime: 15,
		},
	);

	return user;
}
