import { ROUTES } from '#/fe/config/routes';
import { Outlet, useNavigate } from 'react-router-dom';
import {
	MenuItem,
	MenuItemList,
	MenuTitle,
	NavigationMenu,
} from '../components/navigation-menu';
import { useIsLogged, useLoggedUserActions } from '../state/logged-user';

const NavBar = () => {
	const navigate = useNavigate();
	const userIsLogged = useIsLogged();
	const { logout } = useLoggedUserActions();

	return (
		<div className="flex justify-between items-center p-4 bg-white shadow-md w-full">
			<a href={ROUTES.HOME} className="text-2xl font-bold">
				EquipRent
			</a>
			{userIsLogged ? (
				<NavigationMenu>
					<MenuTitle>Menu</MenuTitle>
					<MenuItemList>
						<MenuItem
							onSelect={() => navigate(ROUTES.USER.MY_PROFILE)}
						>
							Meu perfil
						</MenuItem>
						<MenuItem
							onSelect={() => navigate(ROUTES.USER.EQUIPMENTS)}
						>
							Meus equipamentos
						</MenuItem>
						<MenuItem
							onSelect={() => navigate(ROUTES.USER.RESERVATIONS)}
						>
							Minhas reservas
						</MenuItem>
						<MenuItem onSelect={() => navigate(ROUTES.USER.CHATS)}>
							Chats
						</MenuItem>
						<MenuItem
							onSelect={() => navigate(ROUTES.USER.NOTIFICATIONS)}
						>
							Notificações
						</MenuItem>
						<MenuItem
							onSelect={() => navigate(ROUTES.USER.FEEDBACKS)}
						>
							Meus feedbacks
						</MenuItem>
						<MenuItem
							onSelect={() => {
								logout();
								navigate(ROUTES.HOME);
							}}
						>
							Sair
						</MenuItem>
					</MenuItemList>
				</NavigationMenu>
			) : (
				<button
					className="text-gray-700 hover:text-gray-900"
					onClick={() => navigate(ROUTES.LOGIN)}
				>
					Entrar
				</button>
			)}
		</div>
	);
};

const BaseLayout = () => {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
};

export default BaseLayout;
