import { ROUTES } from '#/fe/config/routes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cancelReservation, getEquipment, getUser } from '../services/api';
import { Reservation } from '../services/api-types';
import { useLoggedUser } from '../state/logged-user';

type ReservationItemProps = {
	reservation: Reservation;
	refetchItems: () => void;
};

export function ReservationItem({
	reservation,
	refetchItems,
}: ReservationItemProps) {
	const loggedUser = useLoggedUser();

	const navigate = useNavigate();

	const { data: equipment } = useQuery(
		['equipment', reservation.equipment.id],
		() => {
			return getEquipment(reservation.equipment.id);
		},
	);

	const { data: owner } = useQuery(['owner', equipment?.owner.id], () => {
		if (!equipment) return;

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
		<div
			key={reservation.id}
			className="border rounded p-4 flex flex-col justify-between"
		>
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
			<button
				className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				onClick={() => handleCancel(reservation.id)}
			>
				Cancel
			</button>
		</div>
	);
}
