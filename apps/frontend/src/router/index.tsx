import { ROUTES } from '#/fe/config/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatPage from '../pages/chat';
import HomePage from '../pages/home';
import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register';
import UserProfilePage from '../pages/user/profile';
import BaseLayout from '../shared/layout/base-layout';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<BaseLayout />}>
					<Route path={ROUTES.HOME} element={<HomePage />} />
					<Route path={ROUTES.LOGIN} element={<LoginPage />} />
					<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
					<Route
						path={ROUTES.EQUIPMENT.CREATE}
						element={<div>Not implemented.</div>}
					/>
					<Route
						path={ROUTES.EQUIPMENT.EDIT}
						element={<div>Not implemented.</div>}
					/>
					<Route
						path={ROUTES.EQUIPMENT.ROOT}
						element={<div>Not implemented.</div>}
					/>
					<Route
						path={ROUTES.RESERVATION.PAYMENT}
						element={<div>Not implemented.</div>}
					/>
					<Route
						path={ROUTES.RESERVATION.ROOT}
						element={<div>Not implemented.</div>}
					/>
					<Route
						path={ROUTES.USER.MY_PROFILE}
						element={<UserProfilePage />}
					/>
					<Route
						path={ROUTES.USER.PROFILE}
						element={<div>Not implemented.</div>}
					/>
					<Route
						path={ROUTES.USER.EQUIPMENT}
						element={<div>Not implemented.</div>}
					/>
					<Route
						path={ROUTES.USER.RESERVATIONS}
						element={<div>Not implemented.</div>}
					/>
					<Route
						path={ROUTES.USER.GIVEN_FEEDBACKS}
						element={<div>Not implemented.</div>}
					/>
					<Route
						path={ROUTES.USER.RECEIVED_FEEDBACKS}
						element={<div>Not implemented.</div>}
					/>
					<Route
						path={ROUTES.USER.NOTIFICATIONS}
						element={<div>Not implemented.</div>}
					/>
					<Route path={ROUTES.CHAT.ROOT} element={<ChatPage />} />
					<Route
						path={ROUTES.CHAT.MESSAGES}
						element={<div>Not implemented.</div>}
					/>

					<Route element={<>Not implemented</>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
