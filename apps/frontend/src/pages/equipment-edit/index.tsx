import { ROUTES } from '#/fe/config/routes';
import { Container } from '#/fe/shared/components/container';
import { EquipmentForm } from '#/fe/shared/components/equipment-form';
import { useLoggedUser } from '#/fe/shared/hooks/useLoggedUser';
import { getEquipment } from '#/fe/shared/services/api';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EquipmentEditPage() {
	const { equipmentId } = useParams();
	const loggedUser = useLoggedUser();
	const navigate = useNavigate();

	const { data: equipment, isLoading } = useQuery(
		['equipment', equipmentId],
		async () => {
			if (equipmentId) return getEquipment(equipmentId);
		},
		{
			enabled: !!equipmentId,
		},
	);

	if (isLoading) {
		return <div>Carregando...</div>;
	}

	if (equipment?.owner.id !== loggedUser?.id) {
		toast.error('Você não tem permissão para editar este equipamento');
		navigate(ROUTES.HOME);
		return null;
	}

	return (
		<Container>
			<EquipmentForm equipment={equipment} />
		</Container>
	);
}
