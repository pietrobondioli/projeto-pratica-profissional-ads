import { ROUTES } from '#/fe/config/routes';
import { Container } from '#/fe/shared/components/container';
import Loading from '#/fe/shared/components/loading';
import { changeEmail } from '#/fe/shared/services/api';
import { useLoggedUserActions } from '#/fe/shared/state/logged-user';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export function ChangeEmailPage() {
	const { LOGOUT } = useLoggedUserActions();
	const { token } = useParams();
	const navigate = useNavigate();

	const { isLoading } = useQuery(
		['change-email', token],
		() => {
			if (!token) {
				toast.error('Token inválido!');
				navigate(ROUTES.HOME);

				return;
			}

			return changeEmail({ token });
		},
		{
			onSuccess: () => {
				LOGOUT();
				toast.success('Email alterado com sucesso!');
				navigate(ROUTES.HOME);
			},
			onError: () => {
				toast.error('Não foi possível alterar o email!');
				navigate(ROUTES.HOME);
			},
		},
	);

	return (
		<Container className="flex items-center justify-center">
			{isLoading && <Loading />}
		</Container>
	);
}
