import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const STORAGE_KEY = 'LoggedUser';

type LoggedUserState = {
	isLogged: boolean;
	jwtToken?: string;
	userId?: string;
};

type LoggedUserActions = {
	LOGIN: (token: string) => void;
	SET_USER_ID: (userId: string) => void;
	LOGOUT: () => void;
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
				LOGIN: (token) =>
					set((s) => {
						s.state.isLogged = true;
						s.state.jwtToken = token;
					}),
				SET_USER_ID: (userId) =>
					set((s) => {
						s.state.userId = userId;
					}),
				LOGOUT: () =>
					set((s) => {
						s.state.isLogged = false;
						s.state.jwtToken = undefined;
						s.state.userId = undefined;
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

export const useLoggedUserId = () => useLoggedUserStore((s) => s.state.userId);

export const useIsLogged = () => useLoggedUserStore((s) => s.state.isLogged);

export const useJwtToken = () => useLoggedUserStore((s) => s.state.jwtToken);
