import { Container } from '#/fe/shared/components/container';
import { FormItem, FormLabel, FormMessage } from '#/fe/shared/components/form';
import { Input } from '#/fe/shared/components/input';
import { Avatar, AvatarImage } from '#/fe/shared/components/ui/avatar';
import { Button } from '#/fe/shared/components/ui/button';
import { getMe, getMedia, updateUserProfile } from '#/fe/shared/services/api';
import { useJwtToken } from '#/fe/shared/state/logged-user';
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
});

type UserProfile = z.infer<typeof userProfileSchema>;

function UserProfilePage() {
	const jwtToken = useJwtToken();
	const { data: user, isLoading } = useQuery(
		['userProfile', jwtToken],
		async () => {
			if (!jwtToken) {
				throw new Error('No JWT token.');
			}

			return getMe(jwtToken);
		},
	);

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

	const defaultValues = useMemo(() => {
		return {
			firstName: user?.userProfile.firstName,
			lastName: user?.userProfile.lastName,
			contact: user?.userProfile.contact,
			address: user?.userProfile.address,
			description: user?.userProfile.description,
		};
	}, [user]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
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
			});
		}
	}, [user, reset]);

	const handleEditToggle = () => {
		setIsEditMode(!isEditMode);
	};

	const updateProfile = useMutation(
		async (updatedProfile: UserProfile) => {
			if (jwtToken)
				return await updateUserProfile(jwtToken, updatedProfile);
		},
		{
			onSuccess: () => {
				setIsEditMode(false);
				toast.success('Profile updated successfully!');
			},
		},
	);

	const handleSaveChanges = (updatedProfile: UserProfile) => {
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
				<Avatar>
					<AvatarImage src={media?.url} alt="Profile Picture" />
				</Avatar>
				<form
					onSubmit={handleSubmit(handleSaveChanges)}
					className="flex gap-4 flex-col justify-stretch w-full"
				>
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
