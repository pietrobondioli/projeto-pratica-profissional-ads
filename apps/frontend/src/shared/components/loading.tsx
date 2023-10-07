import { FaSpinner } from 'react-icons/fa';

type LoadingProps = {
	size?: number;
};

const Loading = ({ size = 24 }: LoadingProps) => {
	return (
		<div className="flex items-center justify-center">
			<FaSpinner className="animate-spin" size={size} />
		</div>
	);
};

export default Loading;
