export function validatePasswordCharacters(
	value: string,
	options?: {
		testUpperCase?: boolean;
		testLowerCase?: boolean;
		testNumbers?: boolean;
		testSpecialCharacters?: boolean;
	},
): boolean {
	const {
		testUpperCase = true,
		testLowerCase = true,
		testNumbers = true,
		testSpecialCharacters = true,
	} = options ?? {};

	const hasUpperCase = testUpperCase ? /[A-Z]/.test(value) : true;
	const hasLowerCase = testLowerCase ? /[a-z]/.test(value) : true;
	const hasNumbers = testNumbers ? /\d/.test(value) : true;
	const hasSpecialCharacters = testSpecialCharacters
		? /[^\w\b]/.test(value)
		: true;

	return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialCharacters;
}
