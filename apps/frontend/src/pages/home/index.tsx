import { ROUTES } from '#/fe/config/routes';
import { Avatar, AvatarImage } from '#/fe/shared/components/ui/avatar';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '#/fe/shared/components/ui/card';
import {
	FormControl,
	FormItem,
	FormLabel,
} from '#/fe/shared/components/ui/form';
import { Input } from '#/fe/shared/components/ui/input';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '#/fe/shared/components/ui/navigation-menu';
import { Skeleton } from '#/fe/shared/components/ui/skeleton';
import { getMedia, listEquipments } from '#/fe/shared/services/api';
import { Equipment } from '#/fe/shared/services/api-types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

const NavBar = () => {
	const navigate = useNavigate();

	return (
		<div className="flex justify-between items-center p-4 bg-white shadow-md">
			<div className="text-2xl font-bold">Logo</div>
			<input
				type="text"
				placeholder="Search equipments..."
				className="p-2 rounded border"
			/>
			<NavigationMenu>
				<NavigationMenuTrigger>Menu</NavigationMenuTrigger>
				<NavigationMenuContent>
					<NavigationMenuList>
						<NavigationMenuItem
							onSelect={() => navigate(ROUTES.USER.MY_PROFILE)}
						>
							Meu perfil
						</NavigationMenuItem>
						<NavigationMenuItem
							onSelect={() => navigate(ROUTES.USER.FAVORITES)}
						>
							Favoritos
						</NavigationMenuItem>
						<NavigationMenuItem
							onSelect={() => navigate(ROUTES.USER.RESERVATIONS)}
						>
							Minhas reservas
						</NavigationMenuItem>
						<NavigationMenuItem
							onSelect={() => navigate(ROUTES.CHAT.ROOT)}
						>
							Chats
						</NavigationMenuItem>
						<NavigationMenuItem
							onSelect={() => navigate(ROUTES.USER.NOTIFICATIONS)}
						>
							Notificações
						</NavigationMenuItem>
						<NavigationMenuItem
							onSelect={() => navigate(ROUTES.LOGOUT)}
						>
							Sair
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenuContent>
			</NavigationMenu>
		</div>
	);
};

const Equipment = ({ equipment }: { equipment: Equipment }) => {
	const navigate = useNavigate();

	const { data: media } = useQuery(
		['media', equipment.photo.id],
		async () => {
			if (equipment.photo.id) return getMedia(equipment.photo.id);
		},
	);

	return (
		<Card
			className="cursor-pointer"
			onClick={() =>
				navigate(
					generatePath(ROUTES.EQUIPMENT.ROOT, {
						equipmentId: equipment.id,
					}),
				)
			}
		>
			<Avatar>
				<AvatarImage src={media?.url} alt="Equipment Picture" />
			</Avatar>
			<CardHeader>
				<div className="flex flex-col">
					<CardTitle>{equipment.title}</CardTitle>
					<CardDescription>
						{equipment.owner.userProfile.firstName}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col">
					<CardDescription>{equipment.description}</CardDescription>
					<CardDescription>
						{equipment.pricePerDay.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</CardDescription>
				</div>
			</CardContent>
		</Card>
	);
};

const EquipmentList = () => {
	const page = 0;

	const [equipSearch, setEquipSearch] = useState('');

	const { data: equipments, isLoading } = useQuery(
		['equipments', page, equipSearch],
		() =>
			listEquipments({
				page,
				limit: 10,
				title: equipSearch,
			}),
	);

	if (isLoading) {
		return <Skeleton />;
	}

	return (
		<div>
			<FormItem>
				<FormLabel>Equipamento</FormLabel>
				<FormControl>
					<Input
						placeholder="Pesquisar equipamento"
						value={equipSearch}
						onChange={(e) => setEquipSearch(e.target.value)}
					/>
				</FormControl>
			</FormItem>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
				{equipments?.items.map((equipment) => (
					<Equipment key={equipment.id} equipment={equipment} />
				))}
			</div>
		</div>
	);
};

const HomePage = () => {
	return (
		<div className="flex flex-col w-full">
			<NavBar />
			<EquipmentList />
		</div>
	);
};

export default HomePage;
