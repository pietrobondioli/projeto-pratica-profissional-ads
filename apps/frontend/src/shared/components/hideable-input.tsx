import React, { forwardRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type HideableInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	inputRef?: React.Ref<HTMLInputElement>;
};

export const HideableInput = forwardRef<HTMLInputElement, HideableInputProps>(
	({ className, inputRef, type = 'text', ...rest }, ref) => {
		const [showPassword, setShowPassword] = useState(false);

		const toggleShowPassword = () => {
			setShowPassword(!showPassword);
		};

		return (
			<div className="relative">
				<input
					type={showPassword ? 'text' : type}
					className={`border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm py-2 px-3 pr-10 ${className}`}
					ref={inputRef ?? ref}
					{...rest}
				/>
				<button
					type="button"
					className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
					onClick={toggleShowPassword}
				>
					{showPassword ? <FaEyeSlash /> : <FaEye />}
				</button>
			</div>
		);
	},
);
