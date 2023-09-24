type EntityID = string;

type AppEntityBase = {
	id: EntityID;
	createdAt: Date;
	updatedAt: Date;
	createdBy?: string;
	updatedBy?: string;
};

type Equipment = {
	description: string;
	photo: Media;
	pricePerDay: number;
	availabilityStatus: boolean;
	owner: User;
	reservations: Reservation[];
} & AppEntityBase;

type Media = {
	key: string;
	bucket: string;
	mimeType: string;
	lastUpdated: Date;
} & AppEntityBase;

type ChangePasswordToken = {
	user: User;
	token: string;
	expiresAt: Date;
	consumedAt?: Date;
	invalidatedAt?: Date;
	consumerIp?: string;
} & AppEntityBase;

type UserProfile = {
	firstName: string;
	lastName: string;
	contact: string;
	address: string;
	profilePicture?: Media;
	description?: string;
	user: User;
} & AppEntityBase;

type EmailVerificationToken = {
	user: User;
	token: string;
	expiresAt: Date;
	consumedAt?: Date;
	invalidatedAt?: Date;
	consumerIp?: string;
} & AppEntityBase;

type User = {
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
} & AppEntityBase;

type ChangeEmailToken = {
	user: User;
	newEmail: string;
	token: string;
	expiresAt: Date;
	consumedAt?: Date;
	invalidatedAt?: Date;
	consumerIp?: string;
} & AppEntityBase;

type Feedback = {
	fromUser: User;
	toUser: User;
	reservation: Reservation;
	rating: number;
	comment: string;
} & AppEntityBase;

type PaymentMethod = 'CreditCard' | 'Pix';

type Payment = {
	reservation: Reservation;
	paymentMethod: PaymentMethod;
	amount: number;
	paymentDate: Date;
} & AppEntityBase;

type NotificationStatus = 'Read' | 'Unread';

type Notification = {
	user: User;
	message: string;
	status: NotificationStatus;
} & AppEntityBase;

type PaymentStatus = 'Pending' | 'Paid' | 'Failed';

type Reservation = {
	equipment: Equipment;
	renter: User;
	startDate: Date;
	endDate: Date;
	totalPrice: number;
	paymentStatus: PaymentStatus;
	feedbacks: Feedback[];
	payment: Payment;
} & AppEntityBase;

type Chat = {
	user1: User;
	user2: User;
	lastUpdated: Date;
	messages: ChatMessage[];
} & AppEntityBase;

type ChatMessage = {
	chat: Chat;
	sender: User;
	content: string;
	timestamp: Date;
} & AppEntityBase;
