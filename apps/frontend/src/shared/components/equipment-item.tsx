import { ROUTES } from '#/fe/config/routes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteEquipment, getMedia, getUser } from '../services/api';
import { Equipment } from '../services/api-types';
import { useJwtToken, useLoggedUser } from '../state/logged-user';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './card';
import ConfirmationModal from './confirmation-modal';
import { Skeleton } from './ui/skeleton';

type EquipmentItemProps = {
	equipment: Equipment;
	goToEquipment: (equipmentId: string) => void;
	refetchItems: () => void;
};

export const EquipmentItem = ({
	equipment,
	goToEquipment,
}: EquipmentItemProps) => {
	const navigate = useNavigate();
	const jwtToken = useJwtToken();
	const loggedUser = useLoggedUser();

	const { data: owner } = useQuery(['user', equipment.owner.id], async () => {
		if (equipment.owner.id) return getUser(equipment.owner.id);
	});

	const { data: media, isLoading } = useQuery(
		['media', equipment.photo.id],
		async () => {
			if (equipment.photo.id) return getMedia(equipment.photo.id);
		},
	);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const handleEditClick = () => {
		navigate(
			generatePath(ROUTES.EQUIPMENT.EDIT, { equipmentId: equipment.id }),
		);
	};

	const handleDeleteClick = () => {
		setIsDeleteModalOpen(true);
	};

	const deleteMtt = useMutation(
		async () => {
			if (!jwtToken) return;

			await deleteEquipment(jwtToken, equipment.id);
		},
		{
			onSuccess: () => {
				toast.success('Equipment deleted successfully!');
			},
			onError: () => {
				toast.error('Error deleting equipment!');
			},
		},
	);

	const handleDeleteDeny = () => {
		setIsDeleteModalOpen(false);
	};

	const isOwner = loggedUser?.id === equipment.owner.id;

	return (
		<div className="relative w-full h-full">
			{isOwner ? (
				<div className="absolute left-full transform -translate-x-1/2 flex gap-2 justify-start flex-col h-full px-4 -translate-y-6">
					<button
						onClick={handleEditClick}
						className="text-gray-500 hover:text-gray-700 bg-yellow-100 hover:bg-yellow-200 border border-yellow-200 rounded-md p-3"
					>
						<FaEdit />
					</button>
					<button
						onClick={handleDeleteClick}
						className="text-gray-500 hover:text-gray-700 bg-red-100 hover:bg-red-200 border border-red-200 rounded-md p-3"
					>
						<FaTrash />
					</button>
				</div>
			) : (
				<div></div>
			)}
			<Card
				className="cursor-pointer w-full h-full grid grid-flow-row"
				onClick={() => goToEquipment(equipment.id)}
			>
				<CardHeader className="flex flex-col">
					<div className="max-w-[90%] rounded-sm overflow-hidden m-8 grow">
						{isLoading ? (
							<Skeleton />
						) : (
							<img
								src={media?.url}
								alt="Equipment Picture"
								className="w-full h-full object-contain"
							/>
						)}
					</div>
					<CardTitle>{equipment.title}</CardTitle>
					<CardDescription>
						{owner?.userProfile.firstName}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col justify-between h-full">
					<CardDescription className="line-clamp-3">
						{equipment.description}
					</CardDescription>
					<CardDescription>
						{equipment.pricePerDay.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</CardDescription>
				</CardContent>
			</Card>
			<ConfirmationModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={deleteMtt.mutate}
				onDeny={handleDeleteDeny}
			>
				Are you sure you want to delete this equipment?
			</ConfirmationModal>
		</div>
	);
};
