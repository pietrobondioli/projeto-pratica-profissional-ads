import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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
import { Avatar, AvatarImage } from './ui/avatar';

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

	const { data: media } = useQuery(
		['media', equipment.photo.id],
		async () => {
			if (equipment.photo.id) return getMedia(equipment.photo.id);
		},
	);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		navigate(`/equipments/${equipment.id}/edit`);
	};

	const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
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
		<>
			<Card
				className="cursor-pointer"
				onClick={() => goToEquipment(equipment.id)}
			>
				<Avatar>
					<AvatarImage src={media?.url} alt="Equipment Picture" />
				</Avatar>
				<CardHeader>
					<div className="flex flex-col">
						<CardTitle>{equipment.title}</CardTitle>
						<CardDescription>
							{owner?.userProfile.firstName}
						</CardDescription>
					</div>
					{isOwner && (
						<div className="flex gap-2">
							<button
								onClick={handleEditClick}
								className="text-gray-500 hover:text-gray-700"
							>
								<FaEdit />
							</button>
							<button
								onClick={handleDeleteClick}
								className="text-gray-500 hover:text-gray-700"
							>
								<FaTrash />
							</button>
						</div>
					)}
				</CardHeader>
				<CardContent>
					<div className="flex flex-col">
						<CardDescription>
							{equipment.description}
						</CardDescription>
						<CardDescription>
							{equipment.pricePerDay.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</CardDescription>
					</div>
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
		</>
	);
};
