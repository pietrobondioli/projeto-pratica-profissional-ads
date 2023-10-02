import { Avatar, AvatarImage } from '#/fe/shared/components/ui/avatar';
import { Button } from '#/fe/shared/components/ui/button';
import {
	Form,
	FormControl,
	FormItem,
	FormLabel,
} from '#/fe/shared/components/ui/form';
import { Input } from '#/fe/shared/components/ui/input';
import { toast } from '#/fe/shared/components/ui/use-toast';
import { getMe, getMedia, updateUserProfile } from '#/fe/shared/services/api';
import { useJwtToken } from '#/fe/shared/state/logged-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
			if (jwtToken) return getMe(jwtToken);
		},
	);

	const { data: media } = useQuery(
		['media', user?.userProfile.profilePicture.id],
		async () => {
			if (user?.userProfile.profilePicture.id)
				return getMedia(user?.userProfile.profilePicture.id);
		},
	);

	const [isEditMode, setIsEditMode] = useState(false);

	const editForm = useForm({
		resolver: zodResolver(userProfileSchema),
		defaultValues: {
			firstName: user?.userProfile.firstName,
			lastName: user?.userProfile.lastName,
			contact: user?.userProfile.contact,
			address: user?.userProfile.address,
			description: user?.userProfile.description,
		},
	});

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
				toast({
					title: 'Success',
					description: 'Profile updated successfully!',
				});
			},
		},
	);

	const handleSaveChanges = (updatedProfile: UserProfile) => {
		updateProfile.mutate(updatedProfile);
	};

	if (isLoading || !user) return <div>Loading...</div>;

	return (
		<div className="p-4">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-2xl font-bold">Meu Perfil</h2>
				<Button onClick={handleEditToggle}>
					{isEditMode ? 'Cancel' : 'Edit'}
				</Button>
			</div>

			<div className="flex items-start space-x-4">
				<div>
					<Avatar>
						<AvatarImage src={media?.url} alt="Profile Picture" />
					</Avatar>
				</div>
				<div className="flex-grow">
					<Form {...editForm}>
						<form
							onSubmit={editForm.handleSubmit(handleSaveChanges)}
						>
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input
										value={user?.userProfile.firstName}
										readOnly={!isEditMode}
									/>
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel>Sobrenome</FormLabel>
								<FormControl>
									<Input
										value={user.userProfile.lastName}
										readOnly={!isEditMode}
									/>
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input value={user.email} readOnly />
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel>Contato</FormLabel>
								<FormControl>
									<Input
										value={user.userProfile.contact}
										readOnly={!isEditMode}
									/>
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel>Endereço</FormLabel>
								<FormControl>
									<Input
										value={user.userProfile.address}
										readOnly={!isEditMode}
									/>
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel>Descrição</FormLabel>
								<FormControl>
									<Input
										value={user.userProfile.description}
										readOnly={!isEditMode}
									/>
								</FormControl>
							</FormItem>
							{isEditMode && (
								<FormItem>
									<Button type="submit">Save Changes</Button>
								</FormItem>
							)}{' '}
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default UserProfilePage;
