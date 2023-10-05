export const ROUTES = {
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
		ROOT: '/reservation/:reservationId',
		PAYMENT: '/reservation/:reservationId/payment',
	},
	USER: {
		ROOT: '/user',
		MY_PROFILE: '/user/my-profile',
		PROFILE: '/user/:userId/profile',
		EQUIPMENTS: '/user/:userId/equipments',
		RESERVATIONS: '/user/:userId/reservations',
		FEEDBACKS: '/user/:userId/feedbacks',
		NOTIFICATIONS: '/user/:userId/notifications',
		CHATS: '/user/:userId/chats',
	},
} as const;
