import { useQuery } from '@tanstack/react-query';
import { getMe } from '../services/api';
import { useIsLogged, useLoggedUserId } from '../state/logged-user';

export function useLoggedUser() {
	const userId = useLoggedUserId();
	const userIsLogged = useIsLogged();

	const { data: user } = useQuery(
		['user', userId, userIsLogged],
		() => {
			return getMe();
		},
		{
			cacheTime: 15,
			enabled: userIsLogged,
		},
	);

	return user;
}
