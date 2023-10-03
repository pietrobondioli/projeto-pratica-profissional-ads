import React, { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	inputRef?: React.Ref<HTMLInputElement>;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, inputRef, ...rest }, ref) => {
		return (
			<input
				type="text"
				className={`border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm py-2 px-3 ${className}`}
				ref={inputRef ?? ref}
				{...rest}
			/>
		);
	},
);
