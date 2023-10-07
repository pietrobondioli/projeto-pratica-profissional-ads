export function Container({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`container mx-auto pb-16 pt-28 min-h-screen ${className}`}
		>
			{children}
		</div>
	);
}
