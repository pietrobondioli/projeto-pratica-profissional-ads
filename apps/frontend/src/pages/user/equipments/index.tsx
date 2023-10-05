import { ROUTES } from '#/fe/config/routes';
import { EquipmentList } from '#/fe/shared/components/equipment-list';
import { useLoggedUser } from '#/fe/shared/state/logged-user';
import { generatePath, useNavigate } from 'react-router-dom';

const UserEquipmentsPage = () => {
	const loggedUser = useLoggedUser();
	const navigate = useNavigate();

	return (
		<EquipmentList
			userId={loggedUser?.id}
			goToEquipment={(equipmentId) =>
				navigate(generatePath(ROUTES.EQUIPMENT.ROOT, { equipmentId }))
			}
		/>
	);
};

export default UserEquipmentsPage;
