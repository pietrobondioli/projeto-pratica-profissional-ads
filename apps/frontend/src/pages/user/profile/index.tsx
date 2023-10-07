import { Container } from '#/fe/shared/components/container';
import { FormItem, FormLabel, FormMessage } from '#/fe/shared/components/form';
import { Input } from '#/fe/shared/components/input';
import { PhotoUploadInput } from '#/fe/shared/components/photo-upload-input';
import { Button } from '#/fe/shared/components/ui/button';
import {
	getMe,
	getMedia,
	updateUserProfile,
	uploadMedia,
} from '#/fe/shared/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const userProfileSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	contact: z.string().optional(),
	address: z.string().optional(),
	description: z.string().optional(),
	profilePictureId: z.string().optional(),
});

type UserProfileSchema = z.infer<typeof userProfileSchema>;

function UserProfilePage() {
	const { data: user, isLoading } = useQuery(['userProfile'], async () => {
		return getMe();
	});

	const { data: media } = useQuery(
		['media', user?.userProfile.profilePicture?.id],
		async () => {
			if (!user?.userProfile.profilePicture?.id) {
				throw new Error('No profile picture.');
			}

			return getMedia(user?.userProfile.profilePicture.id);
		},
		{
			enabled: !!user?.userProfile.profilePicture?.id,
		},
	);

	const [isEditMode, setIsEditMode] = useState(false);
	const handleEditToggle = () => {
		setIsEditMode(!isEditMode);
	};

	const defaultValues = useMemo(() => {
		return {
			firstName: user?.userProfile.firstName,
			lastName: user?.userProfile.lastName,
			contact: user?.userProfile.contact,
			address: user?.userProfile.address,
			description: user?.userProfile.description,
			profilePictureId: user?.userProfile.profilePicture?.id,
		};
	}, [user]);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<UserProfileSchema>({
		resolver: zodResolver(userProfileSchema),
		defaultValues,
	});

	useEffect(() => {
		if (user) {
			reset({
				firstName: user?.userProfile.firstName,
				lastName: user?.userProfile.lastName,
				contact: user?.userProfile.contact,
				address: user?.userProfile.address,
				description: user?.userProfile.description,
				profilePictureId: user?.userProfile.profilePicture?.id,
			});
		}
	}, [user, reset]);

	const uploadMediaMtt = useMutation(
		async (file: File) => {
			return await uploadMedia(file);
		},
		{
			onSuccess: (media) => {
				setValue('profilePictureId', media?.id);
				toast.success(
					'Nova imagem enviada! Click em salvar para confirmar.',
				);
			},
			onError: (error) => {
				toast.error('Erro ao enviar imagem!');
			},
		},
	);

	const updateProfile = useMutation(
		async (updatedProfile: UserProfileSchema) => {
			return await updateUserProfile(updatedProfile);
		},
		{
			onSuccess: () => {
				setIsEditMode(false);
				toast.success('Profile updated successfully!');
			},
		},
	);

	const handleSaveChanges = (updatedProfile: UserProfileSchema) => {
		updateProfile.mutate(updatedProfile);
	};

	if (isLoading || !user) return <div>Loading...</div>;

	return (
		<Container>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-2xl font-bold">Meu Perfil</h2>
				<Button onClick={handleEditToggle}>
					{isEditMode ? 'Cancel' : 'Edit'}
				</Button>
			</div>

			<div className="flex">
				<form
					onSubmit={handleSubmit(handleSaveChanges)}
					className="flex gap-4 flex-col justify-stretch w-full"
				>
					<FormItem>
						<FormLabel>Photo</FormLabel>
						<PhotoUploadInput
							defaultFileUrl={media?.url}
							onSubmit={(file) => uploadMediaMtt.mutate(file)}
							readOnly={!isEditMode}
						/>
					</FormItem>
					<FormItem>
						<FormLabel>Nome</FormLabel>
						<Input
							readOnly={!isEditMode}
							{...register('firstName')}
						/>
						{errors.firstName && (
							<FormMessage>
								{errors.firstName.message}
							</FormMessage>
						)}
					</FormItem>
					<FormItem>
						<FormLabel>Sobrenome</FormLabel>
						<Input
							readOnly={!isEditMode}
							{...register('lastName')}
						/>
						{errors.lastName && (
							<FormMessage>{errors.lastName.message}</FormMessage>
						)}
					</FormItem>
					<FormItem>
						<FormLabel>Email</FormLabel>
						<Input value={user.email} readOnly />
					</FormItem>
					<FormItem>
						<FormLabel>Contato</FormLabel>
						<Input
							readOnly={!isEditMode}
							{...register('contact')}
						/>
						{errors.contact && (
							<FormMessage>{errors.contact.message}</FormMessage>
						)}
					</FormItem>
					<FormItem>
						<FormLabel>Endereço</FormLabel>
						<Input
							readOnly={!isEditMode}
							{...register('address')}
						/>
						{errors.address && (
							<FormMessage>{errors.address.message}</FormMessage>
						)}
					</FormItem>
					<FormItem>
						<FormLabel>Descrição</FormLabel>
						<Input
							readOnly={!isEditMode}
							{...register('description')}
						/>
						{errors.description && (
							<FormMessage>
								{errors.description.message}
							</FormMessage>
						)}
					</FormItem>
					{isEditMode && (
						<div className="flex w-full">
							<FormItem>
								<Button type="submit">Save Changes</Button>
							</FormItem>
						</div>
					)}
				</form>
			</div>
		</Container>
	);
}

export default UserProfilePage;
