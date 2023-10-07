import React, { forwardRef } from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	textareaRef?: React.Ref<HTMLTextAreaElement>;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, textareaRef, ...rest }, ref) => {
		return (
			<textarea
				className={`border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm py-2 px-3 ${className}`}
				ref={textareaRef ?? ref}
				{...rest}
			/>
		);
	},
);
