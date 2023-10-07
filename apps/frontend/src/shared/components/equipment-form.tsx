import { ROUTES } from '#/fe/config/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import {
	createEquipment,
	getMedia,
	updateEquipment,
	uploadMedia,
} from '../services/api';
import { Equipment } from '../services/api-types';
import { FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { PhotoUploadInput } from './photo-upload-input';
import { Button } from './ui/button';

const equipmentSchema = z.object({
	title: z.string(),
	description: z.string(),
	pricePerDay: z.coerce.number().positive(),
	photoId: z.string().optional(),
});

type EquipmentSchema = z.infer<typeof equipmentSchema>;

type EquipmentFormProps = {
	equipment?: Equipment;
};

export const EquipmentForm = ({ equipment }: EquipmentFormProps) => {
	const navigate = useNavigate();

	const { data: media } = useQuery(
		['media', equipment?.photo.id],
		async () => {
			if (equipment?.photo.id) return getMedia(equipment.photo.id);
		},
	);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<EquipmentSchema>({
		resolver: zodResolver(equipmentSchema),
		defaultValues: {
			title: equipment?.title || '',
			description: equipment?.description || '',
			pricePerDay: equipment?.pricePerDay,
			photoId: equipment?.photo.id,
		},
	});

	useEffect(() => {
		if (equipment) {
			reset({
				title: equipment.title,
				description: equipment.description,
				pricePerDay: equipment.pricePerDay,
				photoId: equipment.photo.id,
			});
		}
	}, [equipment, reset]);

	const uploadMediaMtt = useMutation(
		async (file: File) => {
			return await uploadMedia(file);
		},
		{
			onSuccess: (media) => {
				setValue('photoId', media?.id);
				toast.success(
					'Nova imagem enviada! Click em salvar para confirmar.',
				);
			},
			onError: (error) => {
				toast.error('Erro ao enviar imagem!');
			},
		},
	);

	const updateEquipMtt = useMutation(
		async (data: EquipmentSchema) => {
			if (!equipment?.id) return;

			return await updateEquipment(equipment.id, {
				title: data.title,
				description: data.description,
				pricePerDay: data.pricePerDay,
				photoId: data.photoId,
			});
		},
		{
			onSuccess: (equipment) => {
				toast.success('Equipamento atualizado com sucesso!');
				navigate(ROUTES.USER.EQUIPMENTS);
			},
			onError: (error) => {
				toast.error('Erro ao atualizar equipamento!');
			},
		},
	);

	const createEquipMtt = useMutation(
		async (data: EquipmentSchema) => {
			if (!data.photoId) {
				throw new Error(
					'Você precisa enviar uma imagem para criar um equipamento',
				);
			}

			return await createEquipment({
				title: data.title,
				description: data.description,
				pricePerDay: data.pricePerDay,
				photoId: data.photoId,
			});
		},
		{
			onSuccess: (equipment) => {
				toast.success('Equipamento criado com sucesso!');
				navigate(ROUTES.USER.EQUIPMENTS);
			},
			onError: (error: any) => {
				toast.error('Erro ao criar equipamento!');
				toast.error(error.message);
			},
		},
	);

	const onSubmit = async (data: EquipmentSchema) => {
		if (equipment?.id) {
			updateEquipMtt.mutateAsync(data);
		} else {
			createEquipMtt.mutateAsync(data);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<FormItem>
				<FormLabel>Title</FormLabel>
				<Input
					{...register('title')}
					placeholder="Nome do equipamento"
				/>
				{errors.title && (
					<FormMessage>{errors.title.message}</FormMessage>
				)}
			</FormItem>
			<FormItem>
				<FormLabel>Description</FormLabel>
				<Input {...register('description')} placeholder="Descrição" />
				{errors.description && (
					<FormMessage>{errors.description.message}</FormMessage>
				)}
			</FormItem>
			<FormItem>
				<FormLabel>Price per day</FormLabel>
				<Input
					type="number"
					{...register('pricePerDay')}
					placeholder="Preço por dia"
				/>
				{errors.pricePerDay && (
					<FormMessage>{errors.pricePerDay.message}</FormMessage>
				)}
			</FormItem>
			<FormItem>
				<FormLabel>Photo</FormLabel>
				<PhotoUploadInput
					defaultFileUrl={media?.url}
					onSubmit={(file) => uploadMediaMtt.mutate(file)}
				/>
			</FormItem>
			<Button type="submit" variant="secondary">
				{equipment?.id ? 'Save' : 'Create'}
			</Button>
		</form>
	);
};
