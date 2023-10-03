import { useEffect, useRef, useState } from 'react';

type MenuItemProps = {
	href: string;
	onSelect: () => void;
	children: React.ReactNode;
};

export const MenuItem = ({ href, onSelect, children }: MenuItemProps) => {
	return (
		<a
			href={href}
			className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
			onClick={onSelect}
		>
			{children}
		</a>
	);
};

type NavigationMenuProps = {
	title: string;
	items: MenuItemProps[];
};

export const NavigationMenu = ({ title, items }: NavigationMenuProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative" ref={menuRef}>
			<button
				type="button"
				className="focus:outline-none px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				{title}
			</button>
			{isMenuOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
					{items.map((item) => (
						<MenuItem
							key={item.href}
							href={item.href}
							onSelect={item.onSelect}
						>
							{item.children}
						</MenuItem>
					))}
				</div>
			)}
		</div>
	);
};
