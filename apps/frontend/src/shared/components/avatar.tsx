import React from 'react';

type AvatarProps = {
	className?: string;
	size?: string;
	src?: string;
	alt: string;
	children?: React.ReactNode;
};

const AvatarImage: React.FC<AvatarProps> = ({ src, alt }) => (
	<img className="w-full h-full" src={src} alt={alt} />
);

const AvatarFallback: React.FC<AvatarProps> = ({ alt, children }) => (
	<div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-500 font-bold">
		{children ?? alt.charAt(0)}
	</div>
);

const Avatar: React.FC<AvatarProps> = ({ className, src, alt, children }) => (
	<div
		className={`rounded-full overflow-hidden inline-block h-8 w-8 ${className}`}
	>
		{src ? (
			<AvatarImage src={src} alt={alt} />
		) : (
			<AvatarFallback alt={alt}>{children}</AvatarFallback>
		)}
	</div>
);

export default Avatar;
