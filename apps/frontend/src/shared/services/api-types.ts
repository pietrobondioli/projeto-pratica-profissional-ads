export type BaseEntity = {
	id: string;
	createdAt: string;
	updatedAt: string;
};

export type IdResponse = {
	id: string;
};

export type OrderBy = { field: string; param: 'ASC' | 'DESC' };

export type PaginatedReq = {
	page: number;
	limit: number;
	order?: OrderBy;
};

export type PaginatedResponse<T> = {
	total: number;
	limit: number;
	page: number;
	items: T[];
};

type UserProfile = {
	firstName: string;
	lastName: string;
	contact: string;
	address: string;
	description: string;
	profilePicture?: BaseEntity;
} & BaseEntity;

export type User = {
	email: string;
	userProfile: UserProfile;
} & BaseEntity;

type ChatUserDto = {
	userProfile: {
		firstName: string;
		lastName: string;
	};
} & BaseEntity;

export type Chat = {
	user1: ChatUserDto;
	user2: ChatUserDto;
} & BaseEntity;

type ChatMessage = {
	content: string;
	sender: ChatUserDto;
} & BaseEntity;

export type ChatWithMessages = {
	messages: ChatMessage[];
} & Chat;

export type Feedback = {
	fromUser: BaseEntity;
	reservation: BaseEntity;
	rating: number;
	comment: string;
} & BaseEntity;

export type Notification = {
	message: string;
	status: 'Read' | 'Unread';
} & BaseEntity;

export type Reservation = {
	equipment: BaseEntity;
	renter: BaseEntity;
	startDate: string;
	endDate: string;
	totalPrice: number;
	paymentStatus: 'Pending' | 'Paid' | 'Failed';
	payment: BaseEntity;
} & BaseEntity;

export type Equipment = {
	title: string;
	description: string;
	pricePerDay: number;
	availabilityStatus: boolean;
	photo: BaseEntity;
	owner: User;
} & BaseEntity;

export type Media = {
	key: string;
	bucket: string;
	mimeType: string;
	url: string;
} & BaseEntity;
