import jwtDecode from 'jwt-decode';
import { z } from 'zod';

export const UserPayloadSchema = z.object({
	id: z.string(),
	email: z.string(),
	isVerified: z.boolean(),
});

export type UserPayload = z.infer<typeof UserPayloadSchema>;

export function getPayloadFromJWT(token: string) {
	try {
		const decodedToken = jwtDecode(token);

		const validatedPayload = UserPayloadSchema.parse(decodedToken);
		return validatedPayload;
	} catch (err) {
		console.error('Invalid JWT or payload:', err);
		return null;
	}
}
