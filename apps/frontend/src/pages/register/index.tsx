import { ROUTES } from '#/fe/config/routes';
import { Button } from '#/fe/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Container } from '#/fe/shared/components/container';
import { FormItem, FormLabel, FormMessage } from '#/fe/shared/components/form';
import { HideableInput } from '#/fe/shared/components/hideable-input';
import { Input } from '#/fe/shared/components/input';
import { createUser } from '#/fe/shared/services/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const registerSchema = z
	.object({
		email: z.string().email({ message: 'Formato de email inválido.' }),
		password: z.string().min(6, {
			message: 'A senha deve ter no mínimo 6 caracteres.',
		}),
		confirmPassword: z.string().min(6, {
			message: 'A senha deve ter no mínimo 6 caracteres.',
		}),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				path: ['confirmPassword'],
				code: z.ZodIssueCode.custom,
				message: 'As senhas devem ser iguais.',
			});
		}
	});

type RegisterData = z.infer<typeof registerSchema>;

export function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const navigate = useNavigate();

	const createUserMutation = useMutation(
		async (data: RegisterData) => {
			const createdUser = await createUser({
				email: data.email,
				password: data.password,
			});

			return createdUser;
		},
		{
			onSuccess: async (data) => {
				toast.success('Usuário criado com sucesso!');
				navigate(ROUTES.LOGIN);
			},
			onError: (error: any) => {
				toast.error(error.message);
			},
		},
	);

	async function onSubmit(data: RegisterData) {
		createUserMutation.mutate(data);
	}

	return (
		<Container>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-96 flex-col gap-4 items-stretch p-12 mx-auto"
			>
				<FormItem>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
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

				<FormItem>
					<FormLabel>Confirmar Senha</FormLabel>
					<HideableInput
						type="password"
						placeholder="******"
						{...register('confirmPassword')}
					/>
					{errors.confirmPassword && (
						<FormMessage>
							{errors.confirmPassword.message}
						</FormMessage>
					)}
				</FormItem>

				<Button type="submit" variant="secondary">
					Registrar
				</Button>
			</form>
		</Container>
	);
}
