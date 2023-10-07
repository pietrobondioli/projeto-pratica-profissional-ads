import { ROUTES } from '#/fe/config/routes';
import { FaUserAlt } from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
import Avatar from '../components/avatar';
import {
	MenuIcon,
	MenuItem,
	MenuItemList,
	NavigationMenu,
} from '../components/navigation-menu';
import { useLoggedUser } from '../hooks/useLoggedUser';
import { useMediaUrl } from '../hooks/useMedia';
import { useIsLogged, useLoggedUserActions } from '../state/logged-user';

const NavBar = () => {
	const navigate = useNavigate();
	const userIsLogged = useIsLogged();
	const loggedUser = useLoggedUser();
	const userPictureUrl = useMediaUrl(
		loggedUser?.userProfile.profilePicture?.id,
	);
	const { LOGOUT } = useLoggedUserActions();

	return (
		<div className="flex justify-between items-center p-4 bg-white shadow-md w-full fixed z-50">
			<a href={ROUTES.HOME} className="text-2xl font-bold">
				EquipRent
			</a>
			{userIsLogged ? (
				<NavigationMenu>
					<MenuIcon>
						<Avatar src={userPictureUrl} alt="Profile Picture">
							<FaUserAlt />
						</Avatar>
					</MenuIcon>
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
								LOGOUT();
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
