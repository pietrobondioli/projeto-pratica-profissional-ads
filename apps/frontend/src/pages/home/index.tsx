import { ROUTES } from '#/fe/config/routes';
import { Container } from '#/fe/shared/components/container';
import { EquipmentList } from '#/fe/shared/components/equipment-list';
import { generatePath, useNavigate } from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<EquipmentList
				goToEquipment={(equipmentId) =>
					navigate(
						generatePath(ROUTES.EQUIPMENT.ROOT, { equipmentId }),
					)
				}
			/>
		</Container>
	);
};

export default HomePage;
