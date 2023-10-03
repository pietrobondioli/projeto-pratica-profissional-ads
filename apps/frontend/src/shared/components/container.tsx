export function Container({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={`container mx-auto px-4 py-16 ${className}`}>
			{children}
		</div>
	);
}
