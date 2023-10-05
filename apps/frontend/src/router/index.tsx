import { ROUTES } from '#/fe/config/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatPage from '../pages/chat';
import EquipmentPage from '../pages/equipment';
import EquipmentCreatePage from '../pages/equipment-create';
import EquipmentEditPage from '../pages/equipment-edit';
import HomePage from '../pages/home';
import { LoginPage } from '../pages/login';
import PaymentPage from '../pages/payment';
import { RegisterPage } from '../pages/register';
import ReservationPage from '../pages/reservation';
import UserEquipmentListPage from '../pages/user/equipments';
import UserFeedbackListPage from '../pages/user/feedbacks';
import UserNotificationListPage from '../pages/user/notifications';
import UserProfilePage from '../pages/user/profile';
import UserReservationListPage from '../pages/user/reservations';
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
						element={<EquipmentCreatePage />}
					/>
					<Route
						path={ROUTES.EQUIPMENT.EDIT}
						element={<EquipmentEditPage />}
					/>
					<Route
						path={ROUTES.EQUIPMENT.ROOT}
						element={<EquipmentPage />}
					/>
					<Route
						path={ROUTES.RESERVATION.ROOT}
						element={<ReservationPage />}
					/>
					<Route
						path={ROUTES.RESERVATION.PAYMENT}
						element={<PaymentPage />}
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
					<Route path={ROUTES.USER.CHATS} element={<ChatPage />} />
					<Route element={<>Not implemented</>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
