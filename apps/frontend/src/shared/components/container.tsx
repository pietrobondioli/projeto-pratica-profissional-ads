export function Container({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={`container mx-auto px-4 pb-16 pt-28 ${className}`}>
			{children}
		</div>
	);
}
