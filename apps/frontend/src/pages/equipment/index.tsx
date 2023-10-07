import { useMutation, useQuery } from '@tanstack/react-query';
import { addDays, addYears } from 'date-fns';
import { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ROUTES } from '#/fe/config/routes';
import { Container } from '#/fe/shared/components/container';
import { FormItem, FormLabel } from '#/fe/shared/components/form';
import { Input } from '#/fe/shared/components/input';
import StartChatModal from '#/fe/shared/components/start-chat-modal';
import { Button } from '#/fe/shared/components/ui/button';
import { useLoggedUser } from '#/fe/shared/hooks/useLoggedUser';
import { useMediaUrl } from '#/fe/shared/hooks/useMedia';
import {
	createReservation,
	getEquipment,
	getEquipmentAvailability,
} from '#/fe/shared/services/api';
import { useIsLogged } from '#/fe/shared/state/logged-user';

export default function EquipmentPage() {
	const { equipmentId } = useParams<{ equipmentId: string }>();
	const navigate = useNavigate();
	const userIsLogged = useIsLogged();
	const { loggedUser } = useLoggedUser();

	const [startChatModalIsOpen, setStartChatModalIsOpen] = useState(false);

	const { data: equipment, isLoading } = useQuery(
		['equipment', equipmentId],
		() => {
			if (!equipmentId) return;
			return getEquipment(equipmentId);
		},
	);

	const loggedUserIsOwner = useMemo(() => {
		if (!equipment || !loggedUser) return false;
		return equipment.owner.id === loggedUser.id;
	}, [equipment, loggedUser]);

	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const totalDays = useMemo(() => {
		if (!startDate || !endDate) return 0;
		return Math.ceil(
			(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
		);
	}, [startDate, endDate]);
	const totalPrice = useMemo(() => {
		if (!equipment) return 0;
		return totalDays * equipment.pricePerDay;
	}, [equipment, totalDays]);

	const mediaUrl = useMediaUrl(equipment?.photo.id);

	const { data: equipmentAvailability } = useQuery(
		['equipmentAvailability', equipmentId],
		async () => {
			if (!equipmentId) return;

			return await getEquipmentAvailability(equipmentId, {
				startDate: addDays(new Date(), 1).toISOString(),
				endDate: addYears(new Date(), 1).toISOString(),
			});
		},
	);

	const reserveEquipmentMutation = useMutation(
		async () => {
			if (!userIsLogged) {
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

			return await createReservation({
				equipmentId,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
			});
		},
		{
			onSuccess: () => {
				toast.success('Equipamento reservado com sucesso!');
				navigate(ROUTES.USER.RESERVATIONS);
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

	const handleEditClick = () => {
		navigate(
			generatePath(ROUTES.EQUIPMENT.EDIT, { equipmentId: equipment.id }),
		);
	};

	return (
		<>
			<StartChatModal
				isOpen={startChatModalIsOpen}
				onClose={() => setStartChatModalIsOpen(false)}
				withUserId={equipment.owner.id}
				suggestedMessage={`Olá, gostaria de alugar seu equipamento ${equipment.title}`}
			/>
			<Container className="flex gap-4">
				<div className="w-1/2 p-12">
					<img
						src={mediaUrl}
						alt={equipment.title}
						className="w-full h-96 object-cover rounded-md"
					/>
				</div>
				<div className="w-1/2 p-12 flex flex-col gap-16">
					<div>
						<h1 className="text-2xl font-bold">
							{equipment.title}
						</h1>
						<p className="text-gray-500 mb-4 break-all">
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
					{loggedUserIsOwner ? (
						<>
							<button
								onClick={() => handleEditClick()}
								className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 duration-200"
							>
								Editar equipamento
							</button>
						</>
					) : (
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-4">
								<div className="flex gap-4">
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
											minDate={addDays(new Date(), 1)}
											excludeDates={
												equipmentAvailability?.notAvailableDates
											}
											selectsRange
											customInput={
												<input className="border border-gray-300 rounded-md p-2" />
											}
										/>
									</FormItem>
									<FormItem>
										<FormLabel>Total da reserva</FormLabel>
										<Input readOnly value={totalPrice} />
									</FormItem>
								</div>

								<Button
									onClick={() => {
										handleReserveClick();
									}}
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
							Ou
							<Button
								onClick={() => setStartChatModalIsOpen(true)}
								variant="default"
							>
								Falar com o locador
							</Button>
						</div>
					)}
				</div>
			</Container>
		</>
	);
}
