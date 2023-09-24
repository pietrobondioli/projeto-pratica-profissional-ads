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

const loginSchema = z.object({
	email: z.string().email({ message: 'Formato de email inválido.' }),
	password: z.string().min(6, {
		message: 'A senha deve ter no mínimo 6 caracteres.',
	}),
});

export function LoginPage() {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const navigate = useNavigate();
	const { toast } = useToast();

	function onSubmit(values: z.infer<typeof loginSchema>) {
		if (values.email && values.password) {
			navigate(ROUTES.HOME);
		} else {
			toast({
				title: 'Error',
				description: 'Invalid email or password!',
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

				<Button type="submit">Login</Button>
				<Button
					type="button"
					onClick={() => navigate(ROUTES.REGISTER)}
					className="ml-4"
				>
					Registrar
				</Button>
			</form>
		</Form>
	);
}
