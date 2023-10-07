import { ROUTES } from '#/fe/config/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import z from 'zod';
import {
	deleteFeedback,
	getEquipment,
	getReservation,
	updateFeedback,
} from '../services/api';
import { Feedback } from '../services/api-types';
import EditDeleteButtons from './edit-delete-buttons';
import { FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { Textarea } from './textarea';

const feedbackSchema = z.object({
	rating: z.coerce.number().min(1).max(5),
	comment: z.string().min(1).max(1000),
});

type FeedbackSchema = z.infer<typeof feedbackSchema>;

type UserFeedbackItemProps = {
	feedback: Feedback;
	refetchItems: () => void;
};

export function UserFeedbackItem({
	feedback,
	refetchItems,
}: UserFeedbackItemProps) {
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FeedbackSchema>({
		resolver: zodResolver(feedbackSchema),
		defaultValues: {
			rating: feedback.rating,
			comment: feedback.comment,
		},
	});

	const updateFeedbackMtt = useMutation(
		async (data: FeedbackSchema) => {
			return await updateFeedback(feedback.id, data);
		},
		{
			onSuccess: () => {
				toast.success('Feedback atualizado com sucesso');
				setIsEditing(false);
				refetchItems();
			},
			onError: () => {
				toast.error('Erro ao atualizar feedback');
			},
		},
	);

	const handleSubmitFeedback = (data: FeedbackSchema) => {
		updateFeedbackMtt.mutate(data);
	};

	const deleteFeedbackMtt = useMutation(
		async () => {
			return await deleteFeedback(feedback.id);
		},
		{
			onSuccess: () => {
				toast.success('Feedback deletado com sucesso');
				setIsEditing(false);
				refetchItems();
			},
			onError: () => {
				toast.error('Erro ao deletar feedback');
			},
		},
	);

	const { data: reservation } = useQuery(
		['reservation', feedback.reservation.id],
		() => {
			return getReservation(feedback.reservation.id);
		},
	);

	const { data: equipment } = useQuery(
		['equipment', reservation?.equipment.id],
		() => {
			if (!reservation) throw new Error('No reservation');

			return getEquipment(reservation?.equipment.id);
		},
	);

	return (
		<EditDeleteButtons
			shouldShow
			onEditClick={() => {
				setIsEditing(true);
			}}
			onDeleteClick={() => {
				deleteFeedbackMtt.mutate();
			}}
		>
			<div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-2 bg-white border border-gray-200 rounded-md shadow-md">
				<h2 className="text-lg font-bold mb-4 flex items-center gap-4">
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
				</h2>
				<h2 className="text-lg font-bold mb-4 flex items-center gap-4">
					<div>Reserva: {reservation?.id}</div>
					<button
						onClick={() =>
							reservation?.id &&
							navigate(ROUTES.USER.RESERVATIONS)
						}
						className="text-blue-500 hover:text-blue-700 duration-150"
					>
						<FaExternalLinkAlt />
					</button>
				</h2>

				<form
					onSubmit={handleSubmit(handleSubmitFeedback)}
					className="flex flex-col gap-2 w-full"
				>
					<div>
						<FormItem>
							<FormLabel>Nota</FormLabel>
							{isEditing ? (
								<select {...register('rating')}>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
							) : (
								<Input
									placeholder="Rating"
									{...register('rating')}
									readOnly
								/>
							)}
							{errors.rating && (
								<FormMessage>
									{errors.rating.message}
								</FormMessage>
							)}
						</FormItem>
						<FormItem>
							<FormLabel>Comentário</FormLabel>
							<Textarea
								placeholder="Rating"
								{...register('comment')}
								rows={5}
							/>
							{errors.comment && (
								<FormMessage>
									{errors.comment.message}
								</FormMessage>
							)}
						</FormItem>
					</div>
					<div className="flex flex-col gap-2">
						{isEditing && (
							<>
								<button
									type="submit"
									className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 duration-200"
								>
									Editar
								</button>
								<button
									onClick={() => {
										setIsEditing(false);
									}}
									className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 duration-200"
								>
									Cancelar
								</button>
							</>
						)}
					</div>
				</form>
			</div>
		</EditDeleteButtons>
	);
}
