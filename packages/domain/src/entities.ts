export class BaseEntity {
	id: string;

	createdAt: Date;

	updatedAt: Date;

	createdBy: string;

	updatedBy: string;
}

export class User extends BaseEntity {
	email: string;

	passwordHash: string;

	userProfile: UserProfile;

	equipment: Equipment[];

	reservations: Reservation[];

	givenFeedbacks: Feedback[];

	receivedFeedbacks: Feedback[];

	notifications: Notification[];

	changeEmailTokens: ChangeEmailToken[];

	changePasswordTokens: ChangePasswordToken[];

	emailVerificationTokens: EmailVerificationToken[];
}

export class UserProfile extends BaseEntity {
	firstName: string;

	lastName: string;

	contact: string;

	address: string;

	profilePicture?: Media;

	description?: string;

	user: User;
}

export class ChangeEmailToken extends BaseEntity {
	user: User;

	newEmail: string;

	token: string;

	expiresAt: Date;

	consumedAt?: Date;

	invalidatedAt?: Date;

	consumerIp?: string;
}

export class ChangePasswordToken extends BaseEntity {
	user: User;

	token: string;

	expiresAt: Date;

	consumedAt?: Date;

	invalidatedAt?: Date;

	consumerIp?: string;
}

export class EmailVerificationToken extends BaseEntity {
	user: User;

	token: string;

	expiresAt: Date;

	consumedAt?: Date;

	invalidatedAt?: Date;

	consumerIp?: string;
}

export class Chat extends BaseEntity {
	user1: User;

	user2: User;

	lastUpdated: Date;

	messages: ChatMessage[];
}

export class ChatMessage extends BaseEntity {
	chat: Chat;

	sender: User;

	content: string;

	timestamp: Date;
}

export class Media extends BaseEntity {
	key: string;

	bucket: string;

	mimeType: string;

	lastUpdated: Date;
}

export class Equipment extends BaseEntity {
	description: string;

	photo: string;

	pricePerDay: number;

	availabilityStatus: boolean;

	owner: User;

	reservations: Reservation[];
}

export enum PaymentStatus {
	PENDING = 'Pending',
	PAID = 'Paid',
	FAILED = 'Failed',
}

export class Reservation extends BaseEntity {
	equipment: Equipment;

	renter: User;

	startDate: Date;

	endDate: Date;

	totalPrice: number;

	paymentStatus: PaymentStatus;

	feedbacks: Feedback[];

	payment: Payment;
}

export class Feedback extends BaseEntity {
	fromUser: User;

	toUser: User;

	reservation: Reservation;

	rating: number;

	comment: string;
}

export enum NotificationStatus {
	READ = 'Read',
	UNREAD = 'Unread',
}

export class Notification extends BaseEntity {
	user: User;

	message: string;

	status: NotificationStatus;
}

export enum PaymentMethod {
	CREDIT_CARD = 'CreditCard',
	PIX = 'Pix',
}

export class Payment extends BaseEntity {
	reservation: Reservation;

	paymentMethod: PaymentMethod;

	amount: number;

	paymentDate: Date;
}
