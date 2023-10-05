import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { listEquipments } from '../services/api';
import { EquipmentItem } from './equipment-item';
import { Input } from './input';
import { Skeleton } from './ui/skeleton';

type EquipmentListProps = {
	userId?: string;
	goToEquipment: (equipmentId: string) => void;
};

export const EquipmentList = ({
	userId,
	goToEquipment,
}: EquipmentListProps) => {
	const [page, setPage] = useState(1);
	const [equipSearch, setEquipSearch] = useState('');

	const debouncedSearchTerm = useDebounce(equipSearch, 500);

	const {
		data: equipments,
		isLoading,
		refetch,
	} = useQuery(['equipments', page, debouncedSearchTerm], () =>
		listEquipments({
			page,
			limit: 10,
			title: debouncedSearchTerm,
			userId,
		}),
	);

	if (isLoading) {
		return <Skeleton />;
	}

	const handlePrevPageClick = () => {
		setPage((prevPage) => prevPage - 1);
	};

	const handleNextPageClick = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const isFirstPage = page === 1;
	const isLastPage = !equipments?.hasMore;

	return (
		<div className="flex flex-col gap-8">
			<Input
				placeholder="Pesquisar equipamento"
				value={equipSearch}
				onChange={(e) => setEquipSearch(e.target.value)}
			/>
			<div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] place-items-center">
				{equipments?.items.map((equipment) => (
					<EquipmentItem
						key={equipment.id}
						equipment={equipment}
						goToEquipment={goToEquipment}
						refetchItems={() => refetch()}
					/>
				))}
			</div>
			<div className="flex justify-center gap-4 mt-4">
				<button
					onClick={handlePrevPageClick}
					disabled={isFirstPage}
					className={`${
						isFirstPage
							? 'bg-gray-300 cursor-not-allowed'
							: 'bg-blue-500'
					} text-white px-4 py-2 rounded-md`}
				>
					Previous
				</button>
				<button
					onClick={handleNextPageClick}
					disabled={isLastPage}
					className={`${
						isLastPage
							? 'bg-gray-300 cursor-not-allowed'
							: 'bg-blue-500'
					} text-white px-4 py-2 rounded-md`}
				>
					Next
				</button>
			</div>
		</div>
	);
};
