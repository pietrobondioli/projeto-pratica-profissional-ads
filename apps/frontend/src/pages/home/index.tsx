import { ROUTES } from '#/fe/config/routes';
import { EquipmentList } from '#/fe/shared/components/equipment-list';
import { generatePath, useNavigate } from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<>
			<EquipmentList
				goToEquipment={(equipmentId) =>
					navigate(
						generatePath(ROUTES.EQUIPMENT.ROOT, { equipmentId }),
					)
				}
			/>
		</>
	);
};

export default HomePage;
