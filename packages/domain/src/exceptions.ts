export class Exception<Payload = any> extends Error {
	constructor(
		public cause?: any,
		public payload?: Payload,
	) {
		super();
		const stringifiedCause = !!cause ? `(${JSON.stringify(cause)})` : '';
		this.message = `${stringifiedCause}`.trim();
		this.name = this.constructor.name;
	}
}

type UserAlreadyExistsPayload = {
	email: string;
};

export class UserAlreadyExistsException extends Exception {
	constructor(public payload: UserAlreadyExistsPayload) {
		super('UserAlreadyExistsError', payload);
	}
}
