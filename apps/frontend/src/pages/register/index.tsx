import { ROUTES } from '#/fe/config/routes';
import { Button } from '#/fe/shared/components/ui/button';
import { useToast } from '#/fe/shared/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { FormItem, FormLabel, FormMessage } from '#/fe/shared/components/form';
import { Input } from '#/fe/shared/components/input';
import { createUser } from '#/fe/shared/services/api';
import { useMutation } from '@tanstack/react-query';

const registerSchema = z
	.object({
		firstName: z.string().nonempty({ message: 'O nome é obrigatório.' }),
		lastName: z
			.string()
			.nonempty({ message: 'O sobrenome é obrigatório.' }),
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
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const navigate = useNavigate();
	const { toast } = useToast();

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
				navigate(ROUTES.LOGIN);
			},
			onError: (error: any) => {
				toast({
					title: 'Error',
					description: error.message,
				});
			},
		},
	);

	async function onSubmit(data: RegisterData) {
		createUserMutation.mutate(data);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex w-full flex-col gap-4 items-center p-12"
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
				<Input
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
				<Input
					type="password"
					placeholder="******"
					{...register('confirmPassword')}
				/>
				{errors.confirmPassword && (
					<FormMessage>{errors.confirmPassword.message}</FormMessage>
				)}
			</FormItem>

			<Button type="submit">Registrar</Button>
		</form>
	);
}
