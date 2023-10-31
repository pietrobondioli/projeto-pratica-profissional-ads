import { Container } from '#/fe/shared/components/container';
import Loading from '#/fe/shared/components/loading';
import { UserFeedbackItem } from '#/fe/shared/components/user-feedback-item';
import { listFeedbacks } from '#/fe/shared/services/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UserFeedbackListPage() {
	const [page, setPage] = useState(1);
	const { userId } = useParams();

	const {
		data: feedbacks,
		isLoading,
		refetch,
	} = useQuery(['feedbacks'], () => {
		return listFeedbacks({
			page,
			limit: 50,
			userId: userId,
		});
	});

	if (isLoading) {
		return <Loading />;
	}

	const handlePrevPageClick = () => {
		setPage((prevPage) => prevPage - 1);
	};

	const handleNextPageClick = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const isFirstPage = page === 1;
	const isLastPage = !feedbacks?.hasMore;

	return (
		<Container>
			<div className="w-full grid gap-6 place-items-center">
				{feedbacks?.items.map((feedback) => (
					<UserFeedbackItem
						key={feedback.id}
						feedback={feedback}
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
					Anterior
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
					Próxima
				</button>
			</div>
		</Container>
	);
}
