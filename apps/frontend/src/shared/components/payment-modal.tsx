import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { payForReservation } from '../services/api';
import { PaymentMethod } from '../services/api-types';
import { useIsLogged } from '../state/logged-user';
import { FormItem, FormLabel } from './form';
import Modal, { ModalProps } from './modal';

type ConfirmationModalProps = ModalProps & {
	reservationId: string;
	invalidateReservations: () => void;
};

function PaymentModal({
	isOpen,
	onClose,
	reservationId,
	invalidateReservations,
}: ConfirmationModalProps) {
	const isLogged = useIsLogged();

	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<PaymentMethod>('CreditCard');

	const payForReservationMtt = useMutation(
		async (data: {
			reservationId: string;
			paymentMethod: PaymentMethod;
		}) => {
			if (!isLogged)
				throw new Error(
					'Para fazer um pagamento, você precisa estar logado.',
				);

			const res = await payForReservation({
				reservationId: data.reservationId,
				paymentMethod: data.paymentMethod,
			});
			return res;
		},
		{
			onSuccess: () => {
				toast.success('Pagamento feito com sucesso!');
				invalidateReservations();
				onClose?.();
			},
			onError: (err: any) => {
				toast.error(`Erro ao fazer pagamento: ${err.message}`);
				onClose?.();
			},
		},
	);

	const handleFazerPagamento = () => {
		payForReservationMtt.mutate({
			reservationId,
			paymentMethod: selectedPaymentMethod,
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="flex flex-col gap-4 p-4 w-96">
				<h2 className="text-lg font-medium mb-4">
					Selecione o método de pagamento
				</h2>
				<FormItem>
					<FormLabel>Método de pagamento</FormLabel>
					<select
						className="border rounded p-2"
						onChange={(e) =>
							setSelectedPaymentMethod(
								e.target.value as PaymentMethod,
							)
						}
					>
						<option value="CreditCard">Cartão de crédito</option>
						<option value="Pix">Pix</option>
					</select>
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
						onClick={handleFazerPagamento}
						className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 duration-200"
					>
						Fazer pagamento
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default PaymentModal;
