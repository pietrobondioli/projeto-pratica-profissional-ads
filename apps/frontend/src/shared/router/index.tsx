import { ROUTES } from '#/fe/config/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={ROUTES.HOME}
					element={<div>Not implemented.</div>}
				/>
				<Route
					path={ROUTES.LOGIN}
					element={<div>Not implemented.</div>}
				/>
				<Route
					path={ROUTES.REGISTER}
					element={<div>Not implemented.</div>}
				/>
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
					element={<div>Not implemented.</div>}
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
				<Route
					path={ROUTES.CHAT.MESSAGES}
					element={<div>Not implemented.</div>}
				/>
				<Route
					path={ROUTES.CHAT.ROOT}
					element={<div>Not implemented.</div>}
				/>

				<Route element={<>Not implemented</>} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
