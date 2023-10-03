import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const STORAGE_KEY = 'LoggedUser';

type User = {
	id: string;
	email: string;
	userProfile: {
		firstName: string;
		lastName: string;
		contact: string;
		address: string;
		description: string;
		profilePicture: {
			id: string;
		};
	};
};

type LoggedUserState = {
	isLogged: boolean;
	jwtToken?: string;
	user?: User;
};

type LoggedUserActions = {
	login: (token: string, user: User) => void;
	logout: () => void;
};

type LoggedUserStore = {
	state: LoggedUserState;
	actions: LoggedUserActions;
};

const INITIAL_STATE: LoggedUserState = {
	isLogged: false,
};

export const useLoggedUserStore = create<LoggedUserStore>()(
	persist(
		immer((set) => ({
			state: INITIAL_STATE,
			actions: {
				login: (token, user) =>
					set((s) => {
						s.state.isLogged = true;
						s.state.jwtToken = token;
						s.state.user = user;
					}),
				logout: () =>
					set((s) => {
						s.state.isLogged = false;
						s.state.user = undefined;
					}),
			},
		})),
		{
			name: STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
			partialize: (s) => ({ state: s.state }),
		},
	),
);

export const useLoggedUserActions = () => useLoggedUserStore((s) => s.actions);

export const useLoggedUserState = () => useLoggedUserStore((s) => s.state);

export const useLoggedUser = () => useLoggedUserStore((s) => s.state.user);

export const useIsLogged = () => useLoggedUserStore((s) => s.state.isLogged);

export const useJwtToken = () => useLoggedUserStore((s) => s.state.jwtToken);
