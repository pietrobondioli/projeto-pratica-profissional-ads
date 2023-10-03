import { ROUTES } from '#/fe/config/routes';
import { Outlet, useNavigate } from 'react-router-dom';
import { NavigationMenu } from '../components/navigation-menu';
import { useIsLogged } from '../state/logged-user';

const NavBar = () => {
	const navigate = useNavigate();
	const userIsLogged = useIsLogged();

	return (
		<div className="flex justify-between items-center p-4 bg-white shadow-md">
			<a href={ROUTES.HOME} className="text-2xl font-bold">
				EquipRent
			</a>
			{userIsLogged ? (
				<NavigationMenu
					title="Menu"
					items={[
						{
							href: ROUTES.USER.MY_PROFILE,
							onSelect: () => navigate(ROUTES.USER.MY_PROFILE),
							children: 'Meu perfil',
						},
						{
							href: ROUTES.CHAT.ROOT,
							onSelect: () => navigate(ROUTES.CHAT.ROOT),
							children: 'Chats',
						},
						{
							href: ROUTES.USER.NOTIFICATIONS,
							onSelect: () => navigate(ROUTES.USER.NOTIFICATIONS),
							children: 'Notificações',
						},
						{
							href: ROUTES.LOGOUT,
							onSelect: () => navigate(ROUTES.LOGOUT),
							children: 'Sair',
						},
					]}
				/>
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
