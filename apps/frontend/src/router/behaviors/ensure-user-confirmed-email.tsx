import Modal from '#/fe/shared/components/modal';
import { useLoggedUser } from '#/fe/shared/hooks/useLoggedUser';
import { requestConfirmAccountToken } from '#/fe/shared/services/api';
import { useLoggedUserActions } from '#/fe/shared/state/logged-user';
import { useMutation } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

export function EnsureUserConfirmedEmail() {
	const { loggedUser } = useLoggedUser();
	const { LOGOUT } = useLoggedUserActions();

	const resendConfirmationEmailMtt = useMutation(
		async (email?: string) => {
			if (!email) {
				throw new Error('Email inválido!');
			}

			await requestConfirmAccountToken({ email });
		},
		{
			onSuccess: () => {
				toast.success('Email de confirmação reenviado com sucesso!');
			},
			onError: () => {
				toast.error(
					'Não foi possível reenviar o email de confirmação!',
				);
			},
		},
	);

	return (
		<>
			<Modal isOpen={!loggedUser?.confirmedEmail}>
				<div className="flex flex-col gap-4 p-4 w-96">
					<h2 className="text-lg font-medium mb-4">
						Confirme seu email
					</h2>
					<p className="mb-4">
						Para utilizar o sistema é necessário confirmar seu
						email.
					</p>
					<button
						onClick={() => {
							LOGOUT();
						}}
					>
						Sair
					</button>
					<button
						onClick={() => {
							resendConfirmationEmailMtt.mutate(
								loggedUser?.email,
							);
						}}
					>
						Reenviar email de confirmação
					</button>
				</div>
			</Modal>
			<Outlet />
		</>
	);
}
