import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const STORAGE_KEY = 'LoggedUser';

type LoggedUserState = {
	isLogged: boolean;
	user?: User;
};

type LoggedUserActions = {
	login: (user: User) => void;
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
				login: (user) =>
					set((state) => {
						state.isLogged = true;
						state.user = user;
					}),
				logout: () =>
					set((state) => {
						state.isLogged = false;
						state.user = undefined;
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
