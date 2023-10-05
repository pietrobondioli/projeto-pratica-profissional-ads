import { useMutation, useQuery } from '@tanstack/react-query';
import { addYears, subYears } from 'date-fns';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ROUTES } from '#/fe/config/routes';
import { Container } from '#/fe/shared/components/container';
import { FormItem, FormLabel } from '#/fe/shared/components/form';
import { Button } from '#/fe/shared/components/ui/button';
import {
	createReservation,
	getEquipment,
	getEquipmentAvailability,
	getMedia,
} from '#/fe/shared/services/api';
import { useJwtToken } from '#/fe/shared/state/logged-user';

export default function EquipmentPage() {
	const { equipmentId } = useParams<{ equipmentId: string }>();
	const navigate = useNavigate();

	const jwtToken = useJwtToken();

	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const { data: equipment, isLoading } = useQuery(
		['equipment', equipmentId],
		() => {
			if (!equipmentId) return;
			return getEquipment(equipmentId);
		},
	);

	const { data: media } = useQuery(
		['media', equipment?.photo.id],
		async () => {
			if (!equipment?.photo.id) return;
			return await getMedia(equipment.photo.id);
		},
	);

	const { data: equipmentAvailability } = useQuery(
		['equipmentAvailability', equipmentId],
		async () => {
			if (!equipmentId) return;

			return await getEquipmentAvailability(equipmentId, {
				startDate: subYears(new Date(), 1).toISOString(),
				endDate: addYears(new Date(), 1).toISOString(),
			});
		},
	);

	const reserveEquipmentMutation = useMutation(
		async () => {
			if (!jwtToken) {
				toast.error(
					'Você precisa estar logado para reservar equipamentos.',
				);
				toast.warn(
					'Ao fazer login, você será redirecionado para a página de reserva.',
				);
				navigate({
					pathname: ROUTES.LOGIN,
					search: `?returnTo=${ROUTES.EQUIPMENT}/${equipmentId}`,
				});
				return;
			}

			if (!equipmentId) throw new Error('Equipamento não encontrado.');

			if (!startDate || !endDate)
				throw new Error('Nenhum período selecionado.');

			return await createReservation(jwtToken, {
				equipmentId,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
			});
		},
		{
			onSuccess: () => {
				toast.success('Equipmento reservado com sucesso!');
			},
			onError: (error: any) => {
				toast.error(`Erro ao reservar equipamento: ${error.message}`);
			},
		},
	);

	function handleReserveClick() {
		reserveEquipmentMutation.mutate();
	}

	if (isLoading) return <div>Loading...</div>;
	if (!equipment) return <div>Equipment not found</div>;

	return (
		<Container className="flex gap-4">
			<div className="w-1/2 p-12">
				<img
					src={media?.url}
					alt={equipment.title}
					className="w-full h-96 object-cover rounded-md"
				/>
			</div>
			<div className="w-1/2 p-12 flex flex-col justify-between">
				<div>
					<h1 className="text-2xl font-bold">{equipment.title}</h1>
					<p className="text-gray-500 mb-4">
						{equipment.description}
					</p>
					<p className="text-gray-500 mb-4">
						Preço por dia: R${equipment.pricePerDay}
					</p>
					<p className="text-gray-500 mb-4">
						Disponibilidade:
						{equipment.availabilityStatus
							? 'Disponível'
							: 'Não disponível'}
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<FormItem>
						<FormLabel>Data da reserva</FormLabel>
						<DatePicker
							selected={startDate}
							onChange={(dates) => {
								const [start, end] = dates;
								setStartDate(start);
								setEndDate(end);
							}}
							startDate={startDate}
							endDate={endDate}
							excludeDates={
								equipmentAvailability?.notAvailableDates
							}
							selectsRange
							customInput={
								<input className="border border-gray-300 rounded-md p-2" />
							}
						/>
					</FormItem>

					<Button
						onClick={handleReserveClick}
						disabled={
							!equipment.availabilityStatus ||
							reserveEquipmentMutation.isLoading
						}
						variant="secondary"
					>
						{reserveEquipmentMutation.isLoading
							? 'Reservando...'
							: 'Reservar'}
					</Button>
				</div>
			</div>
		</Container>
	);
}
