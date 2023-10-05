type CardProps = {
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
};

export const Card = ({ className, children, onClick }: CardProps) => {
	return (
		<div
			className={`bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg duration-200 ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export const CardHeader = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

export const CardTitle = ({
	children,
	className,
}: {
	children: string;
	className?: string;
}) => {
	return <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>;
};

export const CardDescription = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return <p className={`text-gray-700 ${className}`}>{children}</p>;
};

export const CardContent = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};
