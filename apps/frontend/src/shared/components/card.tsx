type CardProps = {
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
};

export const Card = ({ className, children, onClick }: CardProps) => {
	return (
		<div
			className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
	return <div className="px-4 py-2">{children}</div>;
};

export const CardTitle = ({ children }: { children: React.ReactNode }) => {
	return <h3 className="text-lg font-medium">{children}</h3>;
};

export const CardDescription = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return <p className="text-gray-500">{children}</p>;
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
	return <div className="px-4 py-2">{children}</div>;
};
