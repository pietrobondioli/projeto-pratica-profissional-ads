import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...rest }: InputProps) => {
	return (
		<input
			type="text"
			className={`border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm py-2 px-3 ${className}`}
			{...rest}
		/>
	);
};
