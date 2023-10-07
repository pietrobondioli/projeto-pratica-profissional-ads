import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createFeedback } from '../services/api';
import { useIsLogged } from '../state/logged-user';
import { FormItem, FormLabel } from './form';
import Modal, { ModalProps } from './modal';
import { Textarea } from './textarea';

type ConfirmationModalProps = ModalProps & {
	reservationId: string;
	invalidateReservations: () => void;
};

function FeedbackModal({
	isOpen,
	onClose,
	reservationId,
	invalidateReservations,
}: ConfirmationModalProps) {
	const isLogged = useIsLogged();

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const giveFeedbackMtt = useMutation(
		async (data: {
			reservationId: string;
			rating: number;
			comment: string;
		}) => {
			if (!isLogged)
				throw new Error(
					'Para dar um feedback, você precisa estar logado.',
				);

			const res = await createFeedback({
				reservationId: data.reservationId,
				rating: data.rating,
				comment: data.comment,
			});
			return res;
		},
		{
			onSuccess: () => {
				toast.success('Feedback enviado com sucesso!');
				invalidateReservations();
				onClose?.();
			},
			onError: (err: any) => {
				toast.error(`Erro ao enviar feedback: ${err.message}`);
				onClose?.();
			},
		},
	);

	const handleEnviarFeedback = () => {
		giveFeedbackMtt.mutate({
			reservationId,
			rating,
			comment,
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="flex flex-col gap-4 p-4 w-96">
				<h2 className="text-lg font-medium mb-4">Deixe seu feedback</h2>
				<FormItem>
					<FormLabel>Nota</FormLabel>
					<select
						className="border rounded p-2"
						onChange={(e) => setRating(Number(e.target.value))}
					>
						<option value="1">1 estrela</option>
						<option value="2">2 estrelas</option>
						<option value="3">3 estrelas</option>
						<option value="4">4 estrelas</option>
						<option value="5">5 estrelas</option>
					</select>
				</FormItem>
				<FormItem>
					<FormLabel>Comentário</FormLabel>
					<Textarea
						className="border rounded p-2"
						onChange={(e) => setComment(e.target.value)}
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
						onClick={handleEnviarFeedback}
						className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 duration-200"
					>
						Enviar feedback
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default FeedbackModal;
