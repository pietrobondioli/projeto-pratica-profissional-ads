import { ROUTES } from '#/fe/config/routes';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '#/fe/shared/components/card';
import { Container } from '#/fe/shared/components/container';
import { Input } from '#/fe/shared/components/input';
import { Avatar, AvatarImage } from '#/fe/shared/components/ui/avatar';
import { Skeleton } from '#/fe/shared/components/ui/skeleton';
import { useDebounce } from '#/fe/shared/hooks/useDebounce';
import { getMedia, getUser, listEquipments } from '#/fe/shared/services/api';
import type { Equipment } from '#/fe/shared/services/api-types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

const EquipmentItem = ({ equipment }: { equipment: Equipment }) => {
	const navigate = useNavigate();

	const { data: owner } = useQuery(['user', equipment.owner.id], async () => {
		if (equipment.owner.id) return getUser(equipment.owner.id);
	});

	const { data: media } = useQuery(
		['media', equipment.photo.id],
		async () => {
			if (equipment.photo.id) return getMedia(equipment.photo.id);
		},
	);

	return (
		<Card
			className="cursor-pointer"
			onClick={() =>
				navigate(
					generatePath(ROUTES.EQUIPMENT.ROOT, {
						equipmentId: equipment.id,
					}),
				)
			}
		>
			<Avatar>
				<AvatarImage src={media?.url} alt="Equipment Picture" />
			</Avatar>
			<CardHeader>
				<div className="flex flex-col">
					<CardTitle>{equipment.title}</CardTitle>
					<CardDescription>
						{owner?.userProfile.firstName}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col">
					<CardDescription>{equipment.description}</CardDescription>
					<CardDescription>
						{equipment.pricePerDay.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</CardDescription>
				</div>
			</CardContent>
		</Card>
	);
};

const EquipmentList = () => {
	const page = 0;

	const [equipSearch, setEquipSearch] = useState('');

	const debouncedSearchTerm = useDebounce(equipSearch, 500);

	const { data: equipments, isLoading } = useQuery(
		['equipments', page, debouncedSearchTerm],
		() =>
			listEquipments({
				page,
				limit: 10,
				title: debouncedSearchTerm,
			}),
	);

	if (isLoading) {
		return <Skeleton />;
	}

	return (
		<Container className="flex flex-col gap-4">
			<Input
				placeholder="Pesquisar equipamento"
				value={equipSearch}
				onChange={(e) => setEquipSearch(e.target.value)}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{equipments?.items.map((equipment) => (
					<EquipmentItem key={equipment.id} equipment={equipment} />
				))}
			</div>
		</Container>
	);
};

const HomePage = () => {
	return <EquipmentList />;
};

export default HomePage;
