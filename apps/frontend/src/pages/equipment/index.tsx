import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '#/fe/config/routes';
import { Container } from '#/fe/shared/components/container';
import { Button } from '#/fe/shared/components/ui/button';
import { createReservation, getEquipment } from '#/fe/shared/services/api';
import { useJwtToken } from '#/fe/shared/state/logged-user';
import { toast } from 'react-toastify';

export default function EquipmentPage() {
	const { equipmentId } = useParams<{ equipmentId: string }>();
	const navigate = useNavigate();

	const jwtToken = useJwtToken();

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [isReserving, setIsReserving] = useState(false);

	const { data: equipment, isLoading } = useQuery(
		['equipment', equipmentId],
		() => {
			if (!equipmentId) return;
			return getEquipment(equipmentId);
		},
	);

	const reserveEquipmentMutation = useMutation(
		async () => {
			if (!jwtToken) {
				toast.error('You must be logged in to reserve equipment.');
				navigate({
					pathname: ROUTES.LOGIN,
					search: `?returnTo=${ROUTES.EQUIPMENT}/${equipmentId}`,
				});
				return;
			}

			if (!equipmentId) throw new Error('No equipment ID.');

			return await createReservation(jwtToken, {
				equipmentId,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
			});
		},
		{
			onSuccess: () => {
				setIsReserving(false);
				alert('Equipment reserved successfully!');
			},
			onError: (error: any) => {
				setIsReserving(false);
				alert(`Error reserving equipment: ${error.message}`);
			},
		},
	);

	function handleReserveClick() {
		setIsReserving(true);
		reserveEquipmentMutation.mutate();
	}

	if (isLoading) return <div>Loading...</div>;
	if (!equipment) return <div>Equipment not found</div>;

	return (
		<Container className="flex gap-4">
			<div className="w-1/2">
				<img
					src={equipment.photo.url}
					alt={equipment.title}
					className="w-full"
				/>
			</div>
			<div className="w-1/2">
				<h1 className="text-2xl font-bold">{equipment.title}</h1>
				<p className="text-gray-500 mb-4">{equipment.description}</p>
				<p className="text-gray-500 mb-4">
					Preço por dia: R${equipment.pricePerDay}
				</p>
				<p className="text-gray-500 mb-4">
					Disponibilidade:
					{equipment.availabilityStatus
						? 'Disponível'
						: 'Não disponível'}
				</p>
				<Button
					onClick={handleReserveClick}
					disabled={!equipment.availabilityStatus || isReserving}
				>
					{isReserving ? 'Reservando...' : 'Reservar'}
				</Button>
			</div>
		</Container>
	);
}
