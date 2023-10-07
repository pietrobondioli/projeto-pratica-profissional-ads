import { ROUTES } from '#/fe/config/routes';
import { Container } from '#/fe/shared/components/container';
import { FormItem, FormLabel, FormMessage } from '#/fe/shared/components/form';
import { HideableInput } from '#/fe/shared/components/hideable-input';
import { Button } from '#/fe/shared/components/ui/button';
import { changePassword } from '#/fe/shared/services/api';
import { useLoggedUserActions } from '#/fe/shared/state/logged-user';
import { validatePasswordCharacters } from '#/fe/shared/utils/validatePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

const newPasswordSchema = z.object({
	newPassword: z
		.string()
		.min(8)
		.refine((v) => validatePasswordCharacters(v), {
			message:
				'A senha deve conter letras maiúsculas, minúsculas, números e símbolos.',
		}),
});

type NewPassword = z.infer<typeof newPasswordSchema>;

export function ChangePasswordPage() {
	const { token } = useParams();
	const navigate = useNavigate();
	const { LOGOUT } = useLoggedUserActions();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<NewPassword>({
		resolver: zodResolver(newPasswordSchema),
	});

	const changePasswordMtt = useMutation(
		async (data: NewPassword) => {
			if (!token) {
				toast.error('Token inválido!');
				navigate(ROUTES.HOME);

				return;
			}

			return changePassword({ token, newPassword: data.newPassword });
		},
		{
			onSuccess: () => {
				LOGOUT();
				toast.success('Senha alterada com sucesso!');
				navigate(ROUTES.HOME);
			},
			onError: (error: any) => {
				toast.error(
					`Não foi possível alterar a senha! ${error.message}`,
				);
			},
		},
	);

	const onSubmit = (data: NewPassword) => {
		changePasswordMtt.mutate(data);
	};

	return (
		<Container className="flex items-center justify-center">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-96 flex-col gap-4 items-stretch p-12 mx-auto"
			>
				<FormItem>
					<FormLabel>Nova Senha</FormLabel>
					<HideableInput
						type="password"
						placeholder="******"
						{...register('newPassword')}
					/>
					{errors.newPassword && (
						<FormMessage>{errors.newPassword.message}</FormMessage>
					)}
				</FormItem>

				<Button type="submit" variant="secondary">
					Mudar Senha
				</Button>
			</form>
		</Container>
	);
}
