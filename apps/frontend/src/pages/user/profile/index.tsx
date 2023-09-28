import { Avatar, AvatarImage } from '#/fe/shared/components/ui/avatar';
import { Button } from '#/fe/shared/components/ui/button';
import {
	Form,
	FormControl,
	FormItem,
	FormLabel,
} from '#/fe/shared/components/ui/form';
import { Input } from '#/fe/shared/components/ui/input';
import { useLoggedUser } from '#/fe/shared/state/logged-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const getMediaUrl = (media?: Media) => {
	if (!media) return '';
	return `https://${media.bucket}/${media.key}`;
};

const userProfileSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	contact: z.string(),
	address: z.string(),
	description: z.string(),
});

function UserProfilePage() {
	const loggedUser = useLoggedUser();
	const { data: userProfile, isLoading } = useQuery(
		['userProfile', loggedUser.email],
		async () => {
			return {} as UserProfile;
		},
	);
	const [isEditMode, setIsEditMode] = useState(false);

	const editForm = useForm({
		resolver: zodResolver(userProfileSchema),
		defaultValues: userProfile,
	});

	if (isLoading || !userProfile) return <div>Loading...</div>;

	const handleEditToggle = () => {
		setIsEditMode(!isEditMode);
	};

	const handleSaveChanges = (updatedProfile: UserProfile) => {
		setIsEditMode(false);
	};

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
						<AvatarImage
							src={getMediaUrl(userProfile.profilePicture)}
							alt="Profile Picture"
						/>
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
										value={userProfile.firstName}
										readOnly={!isEditMode}
									/>
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel>Sobrenome</FormLabel>
								<FormControl>
									<Input
										value={userProfile.lastName}
										readOnly={!isEditMode}
									/>
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input value={loggedUser.email} readOnly />
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel>Contato</FormLabel>
								<FormControl>
									<Input
										value={userProfile.contact}
										readOnly={!isEditMode}
									/>
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel>Endereço</FormLabel>
								<FormControl>
									<Input
										value={userProfile.address}
										readOnly={!isEditMode}
									/>
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel>Descrição</FormLabel>
								<FormControl>
									<Input
										value={userProfile.description}
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
