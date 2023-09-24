export const mockMedia: Media = {
	id: 'media1',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 'system',
	updatedBy: 'system',
	key: 'mockkey',
	bucket: 'mockbucket',
	mimeType: 'image/jpeg',
	lastUpdated: new Date(),
};

export const mockUser1: User = {
	id: 'user1234',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 'system',
	updatedBy: 'system',
	email: 'mockuser@example.com',
	passwordHash: 'hashedpassword',
	userProfile: {
		id: 'profile1',
		createdAt: new Date(),
		updatedAt: new Date(),
		createdBy: 'system',
		updatedBy: 'system',
		firstName: 'John',
		lastName: 'Doe',
		contact: '+123456789',
		address: '123 Mock St, Mocktown',
		profilePicture: mockMedia,
		description: 'Just a mock user.',
		user: null!,
	},
	equipment: [],
	reservations: [],
	givenFeedbacks: [],
	receivedFeedbacks: [],
	notifications: [],
	changeEmailTokens: [],
	changePasswordTokens: [],
	emailVerificationTokens: [],
};

export const mockUser2: User = {
	id: 'user2',
	createdAt: new Date(),
	updatedAt: new Date(),
	email: 'johndoe@gmail.com',
	passwordHash: 'hashedpassword',
	userProfile: {
		id: 'profile2',
		createdAt: new Date(),
		updatedAt: new Date(),
		firstName: 'John',
		lastName: 'Doe',
		contact: '+123456789',
		address: '123 Mock St, Mocktown',
		profilePicture: mockMedia,
		description: 'Just a mock user.',
		user: null!,
	},
	equipment: [],
	reservations: [],
	givenFeedbacks: [],
	receivedFeedbacks: [],
	notifications: [],
	changeEmailTokens: [],
	changePasswordTokens: [],
	emailVerificationTokens: [],
};

export const mockEquipment1: Equipment = {
	id: ' equipment1',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 'system',
	updatedBy: 'system',
	description: 'Mock drill machine.',
	photo: mockMedia,
	pricePerDay: 15,
	availabilityStatus: true,
	owner: mockUser1,
	reservations: [],
};

export const mockEquipment2: Equipment = {
	id: 'equipment2',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 'system',
	updatedBy: 'system',
	description: 'Mock hammer.',
	photo: mockMedia,
	pricePerDay: 10,
	availabilityStatus: true,
	owner: mockUser1,
	reservations: [],
};

export const mockEquipment3: Equipment = {
	id: 'equipment3',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 'system',
	updatedBy: 'system',
	description: 'Mock saw.',
	photo: mockMedia,
	pricePerDay: 10,
	availabilityStatus: true,
	owner: mockUser1,
	reservations: [],
};

export const equipments = [mockEquipment1, mockEquipment2, mockEquipment3];

export const payment1 = {
	id: 'payment1',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 'system',
	updatedBy: 'system',
	reservation: null!,
	paymentMethod: 'CreditCard',
	amount: 45,
	paymentDate: new Date(),
} satisfies Payment;

export const payment2 = {
	id: 'payment2',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 'system',
	updatedBy: 'system',
	reservation: null!,
	paymentMethod: 'CreditCard',
	amount: 45,
	paymentDate: new Date(),
} satisfies Payment;

export const mockReservation1: Reservation = {
	id: 'reservation1',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 'system',
	updatedBy: 'system',
	equipment: mockEquipment1,
	renter: mockUser2,
	startDate: new Date(),
	endDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days later
	totalPrice: 45,
	paymentStatus: 'Paid',
	feedbacks: [],
	payment: payment1,
};

export const mockReservation2: Reservation = {
	id: 'reservation2',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 'system',
	updatedBy: 'system',
	equipment: mockEquipment2,
	renter: mockUser2,
	startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days before
	endDate: new Date(),
	totalPrice: 45,
	paymentStatus: 'Paid',
	feedbacks: [],
	payment: payment2,
};

export const feedback1: Feedback = {
	id: 'feedback1',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 'system',
	updatedBy: 'system',
	fromUser: mockUser1,
	toUser: mockUser2,
	reservation: mockReservation2,
	rating: 5,
	comment: 'MockUser2 is a great renter.',
};

export const feedback2: Feedback = {
	id: 'feedback2',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 'system',
	updatedBy: 'system',
	fromUser: mockUser2,
	toUser: mockUser1,
	reservation: mockReservation2,
	rating: 5,
	comment: 'MockUser1 is a great owner.',
};

export const mockChat: Chat = {
	id: 'chat1',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 'system',
	updatedBy: 'system',
	user1: mockUser1,
	user2: mockUser2,
	lastUpdated: new Date(),
	messages: createRandomMessages(mockUser1, mockUser2),
};

function createRandomMessages(user1: User, user2: User) {
	const messages: ChatMessage[] = [];
	for (let i = 0; i < 10; i++) {
		messages.push({
			id: `message${i}`,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: 'system',
			updatedBy: 'system',
			chat: null!,
			sender: i % 2 === 0 ? user1 : user2,
			content: `This is mock message ${i}`,
			timestamp: new Date(),
		});
	}
	return messages;
}
