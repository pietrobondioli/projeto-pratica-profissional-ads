import { Container } from '#/fe/shared/components/container';
import { ReservationItem } from '#/fe/shared/components/reservation-item';
import { Skeleton } from '#/fe/shared/components/ui/skeleton';
import { listReservations } from '#/fe/shared/services/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function UserReservationListPage() {
	const [page, setPage] = useState(1);

	const {
		isLoading,
		data: reservations,
		refetch,
	} = useQuery(['reservations', page], () => {
		return listReservations({
			limit: 10,
			page,
		});
	});

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
	const isLastPage = !reservations?.hasMore;

	return (
		<Container>
			<h1 className="text-2xl font-bold mb-4">Reservations</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{reservations?.items.map((reservation) => (
					<ReservationItem
						key={reservation.id}
						reservation={reservation}
						refetchItems={refetch}
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
		</Container>
	);
}
