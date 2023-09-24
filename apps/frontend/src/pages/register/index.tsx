import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '#/fe/shared/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '#/fe/shared/components/ui/form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '#/fe/shared/components/ui/use-toast';
import { Input } from '#/fe/shared/components/ui/input';
import { ROUTES } from '#/fe/config/routes';

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

export function RegisterPage() {
	const form = useForm<z.infer<typeof registerSchema>>({
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

	function onSubmit(values: z.infer<typeof registerSchema>) {
		if (
			values.firstName &&
			values.lastName &&
			values.email &&
			values.password &&
			values.password === values.confirmPassword
		) {
			navigate(ROUTES.HOME);
		} else {
			toast({
				title: 'Error',
				description: 'Verifique seus dados e tente novamente!',
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="firstName"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input placeholder="João" {...field} />
							</FormControl>
							{fieldState.invalid && (
								<FormMessage>
									{fieldState.error?.message}
								</FormMessage>
							)}
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lastName"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormLabel>Sobrenome</FormLabel>
							<FormControl>
								<Input placeholder="Silva" {...field} />
							</FormControl>
							{fieldState.invalid && (
								<FormMessage>
									{fieldState.error?.message}
								</FormMessage>
							)}
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="example@email.com"
									{...field}
								/>
							</FormControl>
							{fieldState.invalid && (
								<FormMessage>
									{fieldState.error?.message}
								</FormMessage>
							)}
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="******"
									{...field}
								/>
							</FormControl>
							{fieldState.invalid && (
								<FormMessage>
									{fieldState.error?.message}
								</FormMessage>
							)}
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormLabel>Confirmar Senha</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="******"
									{...field}
								/>
							</FormControl>
							{fieldState.invalid && (
								<FormMessage>
									{fieldState.error?.message}
								</FormMessage>
							)}
						</FormItem>
					)}
				/>

				<Button type="submit">Registrar</Button>
			</form>
		</Form>
	);
}
