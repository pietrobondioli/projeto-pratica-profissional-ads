import { ROUTES } from '#/fe/config/routes';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChangeEmailPage } from '../pages/change-email';
import { ChangePasswordPage } from '../pages/change-password';
import ChatPage from '../pages/chat';
import { ConfirmEmailPage } from '../pages/confirm-email';
import EquipmentPage from '../pages/equipment';
import EquipmentCreatePage from '../pages/equipment-create';
import EquipmentEditPage from '../pages/equipment-edit';
import HomePage from '../pages/home';
import { LoginPage } from '../pages/login';
import NotFoundPage from '../pages/not-found';
import { RegisterPage } from '../pages/register';
import UserEquipmentListPage from '../pages/user/equipments';
import UserFeedbackListPage from '../pages/user/feedbacks';
import UserNotificationListPage from '../pages/user/notifications';
import UserProfilePage from '../pages/user/profile';
import UserReservationListPage from '../pages/user/reservations';
import BaseLayout from '../shared/layout/base-layout';
import { useIsLogged } from '../shared/state/logged-user';
import ProtectedRoute from './ProtectedRoute';
import { EnsureUserConfirmedEmail } from './behaviors/ensure-user-confirmed-email';

function Router() {
	const isUserLogged = useIsLogged();

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={ROUTES.ANY}
					element={<Navigate to={ROUTES.NOT_FOUND} replace />}
				/>
				<Route element={<BaseLayout />}>
					<Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
					<Route
						path={ROUTES.CONFIRM_EMAIL}
						element={<ConfirmEmailPage />}
					/>
					<Route
						path={ROUTES.CHANGE_EMAIL}
						element={<ChangeEmailPage />}
					/>
					<Route
						path={ROUTES.CHANGE_PASSWORD}
						element={<ChangePasswordPage />}
					/>
					<Route path={ROUTES.HOME} element={<HomePage />} />
					<Route path={ROUTES.LOGIN} element={<LoginPage />} />
					<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
					<Route
						path={ROUTES.EQUIPMENT.ROOT}
						element={<EquipmentPage />}
					/>
					<Route
						element={<ProtectedRoute isAllowed={isUserLogged} />}
					>
						<Route element={<EnsureUserConfirmedEmail />}>
							<Route
								path={ROUTES.EQUIPMENT.CREATE}
								element={<EquipmentCreatePage />}
							/>
							<Route
								path={ROUTES.EQUIPMENT.EDIT}
								element={<EquipmentEditPage />}
							/>
							<Route
								path={ROUTES.USER.MY_PROFILE}
								element={<UserProfilePage />}
							/>
							<Route
								path={ROUTES.USER.PROFILE}
								element={<UserProfilePage />}
							/>
							<Route
								path={ROUTES.USER.EQUIPMENTS}
								element={<UserEquipmentListPage />}
							/>
							<Route
								path={ROUTES.USER.RESERVATIONS}
								element={<UserReservationListPage />}
							/>
							<Route
								path={ROUTES.USER.FEEDBACKS}
								element={<UserFeedbackListPage />}
							/>
							<Route
								path={ROUTES.USER.NOTIFICATIONS}
								element={<UserNotificationListPage />}
							/>
							<Route
								path={ROUTES.USER.CHATS}
								element={<ChatPage />}
							/>{' '}
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
