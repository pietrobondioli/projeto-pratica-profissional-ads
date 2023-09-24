import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
	NavigationMenu,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuList,
	NavigationMenuItem,
} from '#/fe/shared/components/ui/navigation-menu';
import {
	Card,
	CardHeader,
	CardContent,
	CardDescription,
	CardTitle,
} from '#/fe/shared/components/ui/card';
import { Avatar, AvatarImage } from '#/fe/shared/components/ui/avatar';
import { Skeleton } from '#/fe/shared/components/ui/skeleton';
import { ROUTES } from '#/fe/config/routes';

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

const EquipmentList = () => {
	const { data, isLoading } = useQuery(['equipments'], fetchEquipments);

	const equipments = data ?? [];

	if (isLoading) {
		return <Skeleton />;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
			{equipments.map((equipment) => (
				<Card key={equipment.id}>
					<CardHeader>
						<Avatar>
							<AvatarImage
								src={getMediaUrl(equipment.photo)}
								alt="Equipment"
							/>
						</Avatar>
						<CardTitle>{equipment.description}</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription>
							Price per day: {equipment.pricePerDay}
						</CardDescription>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

const fetchEquipments = async () => {
	return [] as Equipment[];
};

const getMediaUrl = (media: Media) => {
	return `https://${media.bucket}/${media.key}`;
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
