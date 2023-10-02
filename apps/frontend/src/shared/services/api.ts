import {
	Chat,
	ChatWithMessages,
	Equipment,
	Feedback,
	IdResponse,
	Media,
	Notification,
	PaginatedReq,
	PaginatedResponse,
	Reservation,
	User,
} from './api-types';

const API_URL = import.meta.env.VITE_API_URL as string;

export async function login(email: string, password: string) {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const token = await response.json();
	return token;
}

export async function createUser(body: { email: string; password: string }) {
	const response = await fetch(`${API_URL}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const createdUser = await response.json();
	return createdUser as IdResponse;
}

export async function getUser(authToken: string, userId: string) {
	const response = await fetch(`${API_URL}/users/${userId}`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const user = await response.json();
	return user as User;
}

export async function getMe(authToken: string) {
	const response = await fetch(`${API_URL}/users/me`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const user = await response.json();
	return user as User;
}

export async function requestConfirmAccountToken(body: { email: string }) {
	const response = await fetch(
		`${API_URL}/users/request-confirm-account-token`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return;
}

export async function confirmAccount(body: { token: string }) {
	const response = await fetch(`${API_URL}/users/confirm-account`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const confirmedUser = await response.json();
	return confirmedUser as IdResponse;
}

export async function requestChangeEmail(
	authToken: string,
	body: {
		newEmail: string;
	},
) {
	const response = await fetch(`${API_URL}/users/request-change-email`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return;
}

export async function changeEmail(body: { email: string; newEmail: string }) {
	const response = await fetch(`${API_URL}/users/change-email`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return;
}

export async function requestChangePassword(body: { email: string }) {
	const response = await fetch(`${API_URL}/users/request-change-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return;
}

export async function changePassword(body: {
	email: string;
	newPassword: string;
}) {
	const response = await fetch(`${API_URL}/users/change-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return;
}

export async function updateUserProfile(
	authToken: string,
	body: {
		firstName?: string;
		lastName?: string;
		contact?: string;
		address?: string;
		description?: string;
		profilePictureId?: string;
	},
) {
	const response = await fetch(`${API_URL}/users/profile`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const updatedUser = await response.json();
	return updatedUser as IdResponse;
}

export async function createReservation(
	authToken: string,
	request: {
		equipmentId: string;
		startDate: string;
		endDate: string;
	},
) {
	const response = await fetch(`${API_URL}/reservations`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const createdReservation = await response.json();
	return createdReservation as IdResponse;
}

export async function cancelReservation(
	authToken: string,
	reservationId: string,
) {
	const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return;
}

export async function getReservation(id: string, authToken: string) {
	const response = await fetch(`${API_URL}/reservations/${id}`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const reservation = await response.json();
	return reservation as Reservation;
}

export async function listReservations(
	authToken: string,
	request: PaginatedReq,
) {
	const { limit, page, order } = request;

	const response = await fetch(
		`${API_URL}/reservations?limit=${limit}&page=${page}&orderBy=${order?.field}:${order?.param}`,
		{
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const reservations = await response.json();
	return reservations as PaginatedResponse<Reservation>;
}

export async function createChat(
	authToken: string,
	request: {
		withUserId: string;
		message: string;
	},
) {
	const response = await fetch(`${API_URL}/chats`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const createdChat = await response.json();
	return createdChat as IdResponse;
}

export async function sendMessage(
	authToken: string,
	request: {
		chatId: string;
		message: string;
	},
) {
	const response = await fetch(
		`${API_URL}/chats/${request.chatId}/messages`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify({ message: request.message }),
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const sentMessage = await response.json();
	return sentMessage as IdResponse;
}

export async function getChat(id: string, authToken: string) {
	const response = await fetch(`${API_URL}/chats/${id}`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const chat = await response.json();
	return chat as ChatWithMessages;
}

export async function listChats(
	authToken: string,
	request: PaginatedReq & {
		targetUserSearch?: string;
	},
) {
	const { targetUserSearch, limit, page, order } = request;

	const response = await fetch(
		`${API_URL}/chats?targetUserSearch=${
			targetUserSearch || ''
		}&limit=${limit}&page=${page}&orderBy=${order?.field}:${order?.param}`,
		{
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const chats = await response.json();
	return chats as Chat[];
}

export async function createEquipment(
	authToken: string,
	request: {
		title: string;
		description: string;
		photoId: string;
		pricePerDay: number;
	},
) {
	const response = await fetch(`${API_URL}/equipment`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const createdEquipment = await response.json();
	return createdEquipment as IdResponse;
}

export async function updateEquipment(
	authToken: string,
	equipmentId: string,
	request: {
		title?: string;
		description?: string;
		photoId?: string;
		pricePerDay?: number;
	},
) {
	const response = await fetch(`${API_URL}/equipment/${equipmentId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const updatedEquipment = await response.json();
	return updatedEquipment as IdResponse;
}

export async function getEquipment(authToken: string, equipmentId: string) {
	const response = await fetch(`${API_URL}/equipment/${equipmentId}`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const equipment = await response.json();
	return equipment as Equipment;
}

export async function listEquipments(
	authToken: string,
	request: PaginatedReq & {
		title?: string;
	},
) {
	const { title, limit, page, order } = request;

	const response = await fetch(
		`${API_URL}/equipment?title=${
			title ?? ''
		}&limit=${limit}&page=${page}&orderBy=${order?.field}:${order?.param}`,
		{
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const equipments = await response.json();
	return equipments as PaginatedResponse<Equipment>;
}

export async function createFeedback(
	authToken: string,
	request: {
		reservationId: string;
		rating: number;
		comment: string;
	},
) {
	const response = await fetch(`${API_URL}/feedbacks`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const createdFeedback = await response.json();
	return createdFeedback as IdResponse;
}

export async function updateFeedback(
	authToken: string,
	feedbackId: string,
	request: {
		rating: number;
		comment: string;
	},
) {
	const response = await fetch(`${API_URL}/feedbacks/${feedbackId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const updatedFeedback = await response.json();
	return updatedFeedback as IdResponse;
}

export async function deleteFeedback(authToken: string, feedbackId: string) {
	const response = await fetch(`${API_URL}/feedbacks/${feedbackId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return;
}

export async function getFeedback(authToken: string, feedbackId: string) {
	const response = await fetch(`${API_URL}/feedback/${feedbackId}`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const feedback = await response.json();
	return feedback as Feedback;
}

export async function listFeedbacks(
	request: PaginatedReq & {
		userId?: string;
	},
	authToken: string,
) {
	const { userId, limit, page, order } = request;

	const response = await fetch(
		`${API_URL}/feedback?userId=${
			userId || ''
		}&limit=${limit}&page=${page}&orderBy=${order?.field}:${order?.param}`,
		{
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const feedbacks = await response.json();
	return feedbacks as PaginatedResponse<Feedback>;
}

export async function uploadMedia(authToken: string, file: File) {
	const formData = new FormData();
	formData.append('file', file);

	const response = await fetch(`${API_URL}/media/upload`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
		body: formData,
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const uploadedMedia = await response.json();
	return uploadedMedia as IdResponse;
}

export async function getMedia(key: string, authToken: string) {
	const response = await fetch(`${API_URL}/media/${key}`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const media = await response.json();
	return media as Media;
}

export async function readNotification(id: string, authToken: string) {
	const response = await fetch(`${API_URL}/notifications/${id}/read`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return;
}

export async function getUserNotifications(authToken: string) {
	const response = await fetch(`${API_URL}/notifications`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const notifications = await response.json();
	return notifications as PaginatedResponse<Notification>;
}
