import { ROUTES } from '#/fe/config/routes';
import { Container } from '#/fe/shared/components/container';
import Loading from '#/fe/shared/components/loading';
import { confirmAccount } from '#/fe/shared/services/api';
import { useLoggedUserActions } from '#/fe/shared/state/logged-user';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export function ConfirmEmailPage() {
	const { token } = useParams();
	const { LOGOUT } = useLoggedUserActions();
	const navigate = useNavigate();

	const { isLoading } = useQuery(
		['confirm-email', token],
		() => {
			if (!token) {
				toast.error('Token inválido!');
				navigate(ROUTES.HOME);

				return;
			}

			return confirmAccount({ token });
		},
		{
			onSuccess: () => {
				LOGOUT();
				toast.success('Email confirmado com sucesso!');
				navigate(ROUTES.HOME);
			},
			onError: () => {
				toast.error('Não foi possível confirmar o email!');
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
