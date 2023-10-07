export const ROUTES = {
	ANY: '*',
	NOT_FOUND: '/not-found',
	HOME: '/',
	LOGIN: '/login',
	LOGOUT: '/logout',
	REGISTER: '/register',
	EQUIPMENT: {
		ROOT: '/equipment/:equipmentId',
		EDIT: '/equipment/:equipmentId/edit',
		CREATE: '/equipment/create',
	},
	RESERVATION: {
		PAYMENT: '/reservation/:reservationId/payment',
	},
	USER: {
		ROOT: '/user',
		MY_PROFILE: '/user/my-profile',
		PROFILE: '/user/:userId/profile',
		EQUIPMENTS: '/user/:userId/equipments',
		RESERVATIONS: '/user/reservations',
		FEEDBACKS: '/user/:userId/feedbacks',
		NOTIFICATIONS: '/user/notifications',
		CHATS: '/user/chats',
	},
	CONFIRM_EMAIL: '/confirm-email/:token',
	CHANGE_EMAIL: '/change-email/:token',
	CHANGE_PASSWORD: '/change-password/:token',
} as const;
