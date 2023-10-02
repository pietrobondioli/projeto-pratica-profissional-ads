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
		FAVORITES: '/user/:userId/favorites',
		EQUIPMENT: '/user/:userId/equipment',
		RESERVATIONS: '/user/:userId/reservations',
		GIVEN_FEEDBACKS: '/user/:userId/given-feedbacks',
		RECEIVED_FEEDBACKS: '/user/:userId/received-feedbacks',
		NOTIFICATIONS: '/user/:userId/notifications',
	},
	CHAT: {
		ROOT: '/chat',
		MESSAGES: '/chat/:chatId/messages',
	},
} as const;
