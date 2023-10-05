import { ROUTES } from '#/fe/config/routes';
import { Container } from '#/fe/shared/components/container';
import { EquipmentList } from '#/fe/shared/components/equipment-list';
import { Button } from '#/fe/shared/components/ui/button';
import { useLoggedUser } from '#/fe/shared/state/logged-user';
import { generatePath, useNavigate } from 'react-router-dom';

const UserEquipmentsPage = () => {
	const loggedUser = useLoggedUser();
	const navigate = useNavigate();

	return (
		<Container>
			<Button onClick={() => navigate(ROUTES.EQUIPMENT.CREATE)}>
				Criar equipamento
			</Button>
			<EquipmentList
				userId={loggedUser?.id}
				goToEquipment={(equipmentId) =>
					navigate(
						generatePath(ROUTES.EQUIPMENT.ROOT, { equipmentId }),
					)
				}
			/>
		</Container>
	);
};

export default UserEquipmentsPage;
