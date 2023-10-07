import { useLoggedUserStore } from '../state/logged-user';
import {
	Chat,
	ChatWithMessages,
	Equipment,
	EquipmentAvailability,
	Feedback,
	IdResponse,
	MeUser,
	Media,
	Notification,
	PaginatedReq,
	PaginatedResponse,
	Reservation,
	User,
} from './api-types';

const API_URL = import.meta.env.VITE_API_URL as string;

export async function apiFetch<T = void>(
	url: string,
	options?: RequestInit & { isJson?: boolean },
): Promise<T> {
	const { isJson = true, ...rest } = options ?? {};

	const authToken = useLoggedUserStore.getState().state.jwtToken;

	const response = await fetch(`${API_URL}${url}`, {
		...rest,
		headers: {
			...rest?.headers,
			...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
			...(isJson ? { 'Content-Type': 'application/json' } : {}),
		},
	});

	if (response.status === 401) {
		useLoggedUserStore.getState().actions.LOGOUT();
	}

	let body: any;

	try {
		body = await response.json();
	} catch (error) {
		body = {};
	}

	if (!response.ok) {
		throw new Error(body.message);
	}

	return body as T;
}

export async function login(email: string, password: string) {
	return await apiFetch<{ token: string }>(`/auth/login`, {
		method: 'POST',
		body: JSON.stringify({ email, password }),
	});
}

export async function createUser(body: { email: string; password: string }) {
	return await apiFetch<IdResponse>(`/users`, {
		method: 'POST',
		body: JSON.stringify(body),
	});
}

export async function getUser(userId: string) {
	return await apiFetch<User>(`/users/${userId}`);
}

export async function getMe() {
	return await apiFetch<MeUser>(`/users/me`);
}

export async function requestConfirmAccountToken(body: { email: string }) {
	return await apiFetch(`/users/request-confirm-account-token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
}

export async function confirmAccount(body: { token: string }) {
	return await apiFetch<IdResponse>(`/users/confirm-account`, {
		method: 'POST',
		body: JSON.stringify(body),
	});
}

export async function requestChangeEmail(body: { newEmail: string }) {
	return await apiFetch(`/users/request-change-email`, {
		method: 'POST',
		body: JSON.stringify(body),
	});
}

export async function changeEmail(body: { token: string }) {
	return await apiFetch(`/users/change-email`, {
		method: 'POST',
		body: JSON.stringify(body),
	});
}

export async function requestChangePassword(body: { email: string }) {
	return await apiFetch(`/users/request-change-password`, {
		method: 'POST',
		body: JSON.stringify(body),
	});
}

export async function changePassword(body: {
	token: string;
	newPassword: string;
}) {
	return await apiFetch(`/users/change-password`, {
		method: 'POST',
		body: JSON.stringify(body),
	});
}

export async function updateUserProfile(body: {
	firstName?: string;
	lastName?: string;
	contact?: string;
	address?: string;
	description?: string;
	profilePictureId?: string;
}) {
	return await apiFetch<IdResponse>(`/users/profile`, {
		method: 'PATCH',
		body: JSON.stringify(body),
	});
}

export async function createReservation(request: {
	equipmentId: string;
	startDate: string;
	endDate: string;
}) {
	return await apiFetch<IdResponse>(`/reservations`, {
		method: 'POST',
		body: JSON.stringify(request),
	});
}

export async function cancelReservation(reservationId: string) {
	return await apiFetch(`/reservations/${reservationId}`, {
		method: 'DELETE',
	});
}

export async function getReservation(id: string) {
	return await apiFetch<Reservation>(`/reservations/${id}`);
}

export async function listReservations(request: PaginatedReq) {
	const { limit, page, order } = request;

	return await apiFetch<PaginatedResponse<Reservation>>(
		`/reservations?limit=${limit}&page=${page}&orderBy=${order?.field}:${order?.param}`,
	);
}

export async function createChat(request: {
	withUserId: string;
	message: string;
}) {
	return await apiFetch<IdResponse>(`/chats`, {
		method: 'POST',
		body: JSON.stringify(request),
	});
}

export async function sendMessage(
	chatId: string,
	request: {
		message: string;
	},
) {
	return await apiFetch<IdResponse>(`/chats/${chatId}/send-message`, {
		method: 'POST',
		body: JSON.stringify(request),
	});
}

export async function getChat(chatId: string) {
	return await apiFetch<ChatWithMessages>(`/chats/${chatId}`);
}

export async function listChats(
	request: PaginatedReq & {
		targetUserSearch?: string;
	},
) {
	const { targetUserSearch, limit, page, order } = request;

	return await apiFetch<PaginatedResponse<Chat>>(
		`/chats?targetUserSearch=${
			targetUserSearch || ''
		}&limit=${limit}&page=${page}&orderBy=${order?.field}:${order?.param}`,
	);
}

export async function createEquipment(request: {
	title: string;
	description: string;
	photoId: string;
	pricePerDay: number;
}) {
	return await apiFetch<IdResponse>(`/equipments`, {
		method: 'POST',
		body: JSON.stringify(request),
	});
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
	return await apiFetch<IdResponse>(`/equipments/${equipmentId}`, {
		method: 'PATCH',
		body: JSON.stringify(request),
	});
}

export async function deleteEquipment(equipmentId: string) {
	return await apiFetch(`/equipments/${equipmentId}`, {
		method: 'DELETE',
	});
}

export async function getEquipment(equipmentId: string) {
	return await apiFetch<Equipment>(`/equipments/${equipmentId}`);
}

export async function listEquipments(
	request: PaginatedReq & {
		title?: string;
		userId?: string;
	},
) {
	const { title = '', userId = '', limit, page, order } = request;

	return await apiFetch<PaginatedResponse<Equipment>>(
		`/equipments?title=${title}&userId=${userId}&limit=${limit}&page=${page}${
			order ? `&orderBy=${order?.field}:${order?.param}` : ''
		}`,
	);
}

export async function getEquipmentAvailability(
	equipmentId: string,
	request: {
		startDate: string;
		endDate: string;
	},
) {
	const { startDate, endDate } = request;

	const availability = await apiFetch<EquipmentAvailability>(
		`/equipments/${equipmentId}/availability?startDate=${startDate}&endDate=${endDate}`,
	);

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
	return await apiFetch<IdResponse>(`/feedbacks`, {
		method: 'POST',
		body: JSON.stringify(request),
	});
}

export async function updateFeedback(
	feedbackId: string,
	request: {
		rating: number;
		comment: string;
	},
) {
	return await apiFetch<IdResponse>(`/feedbacks/${feedbackId}`, {
		method: 'PATCH',
		body: JSON.stringify(request),
	});
}

export async function deleteFeedback(feedbackId: string) {
	return await apiFetch(`/feedbacks/${feedbackId}`, {
		method: 'DELETE',
	});
}

export async function getFeedback(feedbackId: string) {
	return await apiFetch<Feedback>(`/feedback/${feedbackId}`);
}

export async function listFeedbacks(
	request: PaginatedReq & {
		userId?: string;
	},
) {
	const { userId, limit, page, order } = request;

	return await apiFetch<PaginatedResponse<Feedback>>(
		`/feedback?userId=${
			userId || ''
		}&limit=${limit}&page=${page}&orderBy=${order?.field}:${order?.param}`,
	);
}

export async function uploadMedia(file: File) {
	const formData = new FormData();
	formData.append('file', file);

	return await apiFetch<IdResponse>(`/media/upload`, {
		method: 'POST',
		body: formData,
		isJson: false,
	});
}

export async function getMedia(mediaId: string) {
	return await apiFetch<Media>(`/media/${mediaId}`);
}

export async function readNotification(notificationId: string) {
	return await apiFetch(`/notifications/${notificationId}/read`, {
		method: 'PATCH',
	});
}

export async function getUserNotifications() {
	// TODO: add a infinite scroll to notification page using this query
	return await apiFetch<PaginatedResponse<Notification>>(
		`/notifications?limit=100&page=1`,
	);
}
