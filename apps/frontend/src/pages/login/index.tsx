import { ROUTES } from '#/fe/config/routes';
import { FormItem, FormLabel, FormMessage } from '#/fe/shared/components/form';
import { HideableInput } from '#/fe/shared/components/hideable-input';
import { Input } from '#/fe/shared/components/input';
import { Button } from '#/fe/shared/components/ui/button';
import { getMe, login } from '#/fe/shared/services/api';
import { useLoggedUserActions } from '#/fe/shared/state/logged-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email({ message: 'Formato de email inválido.' }),
	password: z.string().min(6, {
		message: 'A senha deve ter no mínimo 6 caracteres.',
	}),
});

type LoginData = z.infer<typeof loginSchema>;

export function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const navigate = useNavigate();
	const { login: loginAction } = useLoggedUserActions();

	const loginMutation = useMutation(
		async (data: LoginData) => {
			const loginRes = await login(data.email, data.password);

			const user = await getMe(loginRes.token);

			return {
				jwtToken: loginRes.token,
				user,
			};
		},
		{
			onSuccess: (token) => {
				loginAction(token.jwtToken, token.user);
				navigate(ROUTES.HOME);
			},
			onError: (error: any) => {
				toast.error(error.message);
			},
		},
	);

	function onSubmit(data: LoginData) {
		loginMutation.mutate(data);
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-4 items-stretch p-12 w-96"
			>
				<FormItem>
					<FormLabel>Email</FormLabel>
					<Input
						placeholder="example@email.com"
						{...register('email')}
					/>
					{errors.email && (
						<FormMessage>{errors.email.message}</FormMessage>
					)}
				</FormItem>

				<FormItem>
					<FormLabel>Senha</FormLabel>
					<HideableInput
						type="password"
						placeholder="******"
						{...register('password')}
					/>
					{errors.password && (
						<FormMessage>{errors.password.message}</FormMessage>
					)}
				</FormItem>

				<div className="flex gap-4 flex-col items-center justify-center">
					<Button
						type="submit"
						disabled={loginMutation.isLoading}
						variant="secondary"
					>
						Login
					</Button>
					ou
					<Button
						type="button"
						onClick={() => navigate(ROUTES.REGISTER)}
					>
						Registrar
					</Button>
				</div>
			</form>
		</div>
	);
}
