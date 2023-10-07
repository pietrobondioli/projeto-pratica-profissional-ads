import { ROUTES } from '#/fe/config/routes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoggedUser } from '../hooks/useLoggedUser';
import { cancelReservation, getEquipment, getUser } from '../services/api';
import { Reservation } from '../services/api-types';
import PaymentModal from './payment-modal';
import StartChatModal from './start-chat-modal';

type ReservationItemProps = {
	reservation: Reservation;
	refetchItems: () => void;
};

export function ReservationItem({
	reservation,
	refetchItems,
}: ReservationItemProps) {
	const { loggedUser } = useLoggedUser();

	const navigate = useNavigate();

	const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
	const [startChatModalIsOpen, setStartChatModalIsOpen] = useState(false);

	const { data: equipment } = useQuery(
		['equipment', reservation.equipment.id],
		() => {
			return getEquipment(reservation.equipment.id);
		},
	);

	const { data: owner } = useQuery(['owner', equipment?.owner.id], () => {
		if (!equipment) throw new Error('No equipment');

		return getUser(equipment.owner.id);
	});

	const ownerName = `${owner?.userProfile.firstName} ${owner?.userProfile.lastName}`;

	const { data: renter } = useQuery(['renter', reservation.renter.id], () => {
		return getUser(reservation.renter.id);
	});

	const renterName = `${renter?.userProfile.firstName} ${renter?.userProfile.lastName}`;

	const loggedUserIsOwner = owner?.id === loggedUser?.id;

	const cancelReservationMtt = useMutation(
		async (reservationId: string) => {
			return await cancelReservation(reservationId);
		},
		{
			onSuccess: () => {
				refetchItems();
				toast.success('Reserva cancelada com sucesso!');
			},
			onError: () => {
				toast.error('Não foi possível cancelar a reserva!');
			},
		},
	);

	const handleCancel = (reservationId: string) => {
		cancelReservationMtt.mutate(reservationId);
	};

	return (
		<>
			<PaymentModal
				isOpen={paymentModalIsOpen}
				onClose={() => setPaymentModalIsOpen(false)}
				reservationId={reservation.id}
				invalidateReservations={refetchItems}
			/>
			<StartChatModal
				isOpen={startChatModalIsOpen}
				onClose={() => setStartChatModalIsOpen(false)}
				withUserId={reservation.rentee.id}
			/>
			<div className="border rounded p-4 flex flex-col justify-between">
				<div>
					<h1 className="text-lg font-bold mb-4 flex items-center gap-4">
						<div>Equipamento: {equipment?.title}</div>
						<button
							onClick={() =>
								equipment?.id &&
								navigate(
									generatePath(ROUTES.EQUIPMENT.ROOT, {
										equipmentId: equipment?.id,
									}),
								)
							}
							className="text-blue-500 hover:text-blue-700 duration-150"
						>
							<FaExternalLinkAlt />
						</button>
					</h1>
					<p className="text-gray-700 mb-2">
						Proprietário: {loggedUserIsOwner ? 'Você' : ownerName}
					</p>
					<p className="text-gray-700 mb-2">
						Locatário: {loggedUserIsOwner ? renterName : 'Você'}
					</p>
					<p className="text-gray-700 mb-2">
						Data de Início:{' '}
						{new Date(reservation.startDate).toLocaleDateString()}
					</p>
					<p className="text-gray-700 mb-2">
						Data de Fim:{' '}
						{new Date(reservation.endDate).toLocaleDateString()}
					</p>
					<p className="text-gray-700 mb-2">
						Preço: R$ {reservation.totalPrice}
					</p>
					<p className="text-gray-700 mb-2">
						Status do Pagamento: {reservation.paymentStatus}
					</p>
				</div>
				<div className="flex gap-4 flex-col">
					{reservation.paymentStatus === 'Pending' && (
						<button
							className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
							onClick={() => setPaymentModalIsOpen(true)}
						>
							Pagar
						</button>
					)}
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => setStartChatModalIsOpen(true)}
					>
						Falar com o{' '}
						{loggedUserIsOwner ? 'Locatário' : 'Proprietário'}
					</button>
					{reservation.paymentStatus === 'Pending' && (
						<button
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
							onClick={() => handleCancel(reservation.id)}
						>
							Cancel
						</button>
					)}
				</div>
			</div>
		</>
	);
}
