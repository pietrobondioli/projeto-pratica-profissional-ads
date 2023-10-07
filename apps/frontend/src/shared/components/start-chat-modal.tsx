import { ROUTES } from '#/fe/config/routes';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createChat } from '../services/api';
import { useIsLogged } from '../state/logged-user';
import { FormItem, FormLabel } from './form';
import Modal, { ModalProps } from './modal';
import { Textarea } from './textarea';

type ConfirmationModalProps = ModalProps & {
	suggestedMessage?: string;
	withUserId: string;
};

function StartChatModal({
	isOpen,
	onClose,
	suggestedMessage,
	withUserId,
}: ConfirmationModalProps) {
	const isLogged = useIsLogged();
	const navigate = useNavigate();

	const [message, setMessage] = useState(suggestedMessage ?? '');

	const startChatMtt = useMutation(
		async (data: { withUserId: string; message: string }) => {
			if (!isLogged)
				throw new Error(
					'Para iniciar uma conversa é necessário estar logado.',
				);

			const res = await createChat({
				withUserId: data.withUserId,
				message: data.message,
			});
			return res;
		},
		{
			onSuccess: () => {
				toast.success('Conversa iniciada com sucesso!');
				navigate(ROUTES.USER.CHATS);
			},
			onError: (err: any) => {
				toast.error(err.message);
			},
		},
	);

	const handleEnviarMensagem = () => {
		startChatMtt.mutate({ withUserId, message: message });
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="flex flex-col gap-4 p-4 w-96">
				<h2 className="text-lg font-medium mb-4">
					Digite sua mensagem
				</h2>
				<FormItem>
					<FormLabel>Mensagem</FormLabel>
					<Textarea
						placeholder="Olá, gostaria de alugar seu equipamento"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						rows={5}
					/>
				</FormItem>
				<div className="flex justify-end gap-2">
					<button
						onClick={() => {
							onClose?.();
						}}
						className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 duration-200"
					>
						Cancelar
					</button>
					<button
						onClick={handleEnviarMensagem}
						className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 duration-200"
					>
						Enviar mensagem
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default StartChatModal;
