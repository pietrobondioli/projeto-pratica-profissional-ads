import { toast } from 'react-toastify';
import { useLoggedUserStore } from '../state/logged-user';
import {
	Chat,
	ChatWithMessages,
	Equipment,
	EquipmentAvailability,
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

export async function apiFetch(
	url: string,
	options?: RequestInit,
): Promise<Response> {
	const authToken = useLoggedUserStore.getState().state.jwtToken;

	const response = await fetch(`${API_URL}${url}`, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
			...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
		},
	});

	if (response.status === 401) {
		useLoggedUserStore.getState().actions.LOGOUT();
		toast.error('Sua sessão expirou, faça login novamente');
	}

	return response;
}

export async function login(email: string, password: string) {
	const response = await apiFetch(`/auth/login`, {
		method: 'POST',
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const token = await response.json();
	return token as { token: string };
}

export async function createUser(body: { email: string; password: string }) {
	const response = await apiFetch(`/users`, {
		method: 'POST',
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const createdUser = await response.json();
	return createdUser as IdResponse;
}

export async function getUser(userId: string) {
	const response = await apiFetch(`/users/${userId}`);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const user = await response.json();
	return user as User;
}

export async function getMe() {
	const response = await apiFetch(`/users/me`);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const user = await response.json();
	return user as User;
}

export async function requestConfirmAccountToken(body: { email: string }) {
	const response = await apiFetch(`/users/request-confirm-account-token`, {
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
}

export async function confirmAccount(body: { token: string }) {
	const response = await apiFetch(`/users/confirm-account`, {
		method: 'GET',
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const confirmedUser = await response.json();
	return confirmedUser as IdResponse;
}

export async function requestChangeEmail(body: { newEmail: string }) {
	const response = await apiFetch(`/users/request-change-email`, {
		method: 'POST',
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}
}

export async function changeEmail(body: { email: string; newEmail: string }) {
	const response = await apiFetch(`/users/change-email`, {
		method: 'POST',
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}
}

export async function requestChangePassword(body: { email: string }) {
	const response = await apiFetch(`/users/request-change-password`, {
		method: 'POST',
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}
}

export async function changePassword(body: {
	email: string;
	newPassword: string;
}) {
	const response = await apiFetch(`/users/change-password`, {
		method: 'POST',
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}
}

export async function updateUserProfile(body: {
	firstName?: string;
	lastName?: string;
	contact?: string;
	address?: string;
	description?: string;
	profilePictureId?: string;
}) {
	const response = await apiFetch(`/users/profile`, {
		method: 'PATCH',
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const updatedUser = await response.json();
	return updatedUser as IdResponse;
}

export async function createReservation(request: {
	equipmentId: string;
	startDate: string;
	endDate: string;
}) {
	const response = await apiFetch(`/reservations`, {
		method: 'POST',
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const createdReservation = await response.json();
	return createdReservation as IdResponse;
}

export async function cancelReservation(reservationId: string) {
	const response = await apiFetch(`/reservations/${reservationId}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}
}

export async function getReservation(id: string) {
	const response = await apiFetch(`/reservations/${id}`);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const reservation = await response.json();
	return reservation as Reservation;
}

export async function listReservations(request: PaginatedReq) {
	const { limit, page, order } = request;

	const response = await apiFetch(
		`/reservations?limit=${limit}&page=${page}&orderBy=${order?.field}:${order?.param}`,
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const reservations = await response.json();
	return reservations as PaginatedResponse<Reservation>;
}

export async function createChat(request: {
	withUserId: string;
	message: string;
}) {
	const response = await apiFetch(`/chats`, {
		method: 'POST',
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
	chatId: string,
	request: {
		message: string;
	},
) {
	const response = await apiFetch(`/chats/${chatId}/send-message`, {
		method: 'POST',
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const sentMessage = await response.json();
	return sentMessage as IdResponse;
}

export async function getChat(chatId: string) {
	const response = await apiFetch(`/chats/${chatId}`);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const chat = await response.json();
	return chat as ChatWithMessages;
}

export async function listChats(
	request: PaginatedReq & {
		targetUserSearch?: string;
	},
) {
	const { targetUserSearch, limit, page, order } = request;

	const response = await apiFetch(
		`/chats?targetUserSearch=${
			targetUserSearch || ''
		}&limit=${limit}&page=${page}&orderBy=${order?.field}:${order?.param}`,
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const chats = await response.json();
	return chats as PaginatedResponse<Chat>;
}

export async function createEquipment(request: {
	title: string;
	description: string;
	photoId: string;
	pricePerDay: number;
}) {
	const response = await apiFetch(`/equipments`, {
		method: 'POST',
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
	equipmentId: string,
	request: {
		title?: string;
		description?: string;
		photoId?: string;
		pricePerDay?: number;
	},
) {
	const response = await apiFetch(`/equipments/${equipmentId}`, {
		method: 'PATCH',
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const updatedEquipment = await response.json();
	return updatedEquipment as IdResponse;
}

export async function deleteEquipment(equipmentId: string) {
	const response = await apiFetch(`/equipments/${equipmentId}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}
}

export async function getEquipment(equipmentId: string) {
	const response = await apiFetch(`/equipments/${equipmentId}`);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const equipment = await response.json();
	return equipment as Equipment;
}

export async function listEquipments(
	request: PaginatedReq & {
		title?: string;
		userId?: string;
	},
) {
	const { title = '', userId = '', limit, page, order } = request;

	const response = await apiFetch(
		`/equipments?title=${title}&userId=${userId}&limit=${limit}&page=${page}${
			order ? `&orderBy=${order?.field}:${order?.param}` : ''
		}`,
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const equipments = await response.json();
	return equipments as PaginatedResponse<Equipment>;
}

export async function getEquipmentAvailability(
	equipmentId: string,
	request: {
		startDate: string;
		endDate: string;
	},
) {
	const { startDate, endDate } = request;

	const response = await apiFetch(
		`/equipments/${equipmentId}/availability?startDate=${startDate}&endDate=${endDate}`,
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const availability = (await response.json()) as EquipmentAvailability;
	availability.notAvailableDates = availability.notAvailableDates.map(
		(date) => new Date(date),
	);
	return availability;
}

export async function createFeedback(request: {
	reservationId: string;
	rating: number;
	comment: string;
}) {
	const response = await apiFetch(`/feedbacks`, {
		method: 'POST',
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
	feedbackId: string,
	request: {
		rating: number;
		comment: string;
	},
) {
	const response = await apiFetch(`/feedbacks/${feedbackId}`, {
		method: 'PATCH',
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const updatedFeedback = await response.json();
	return updatedFeedback as IdResponse;
}

export async function deleteFeedback(feedbackId: string) {
	const response = await apiFetch(`/feedbacks/${feedbackId}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}
}

export async function getFeedback(feedbackId: string) {
	const response = await apiFetch(`/feedback/${feedbackId}`);

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
) {
	const { userId, limit, page, order } = request;

	const response = await apiFetch(
		`/feedback?userId=${
			userId || ''
		}&limit=${limit}&page=${page}&orderBy=${order?.field}:${order?.param}`,
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const feedbacks = await response.json();
	return feedbacks as PaginatedResponse<Feedback>;
}

export async function uploadMedia(file: File) {
	const formData = new FormData();
	formData.append('file', file);

	const response = await apiFetch(`/media/upload`, {
		method: 'POST',

		body: formData,
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const uploadedMedia = await response.json();
	return uploadedMedia as IdResponse;
}

export async function getMedia(mediaId: string) {
	const response = await apiFetch(`/media/${mediaId}`);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const media = await response.json();
	return media as Media;
}

export async function readNotification(notificationId: string) {
	const response = await apiFetch(`/notifications/${notificationId}/read`, {
		method: 'PATCH',
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}
}

export async function getUserNotifications() {
	// TODO: add a infinite scroll to notification page using this query
	const response = await apiFetch(`/notifications?limit=100&page=1`);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const notifications = await response.json();
	return notifications as PaginatedResponse<Notification>;
}
