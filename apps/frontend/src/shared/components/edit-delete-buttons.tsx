import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

type EditDeleteButtonsProps = {
	shouldShow: boolean;
	onEditClick: () => void;
	onDeleteClick: () => void;
	children?: React.ReactNode;
};

function EditDeleteButtons({
	shouldShow,
	onEditClick,
	onDeleteClick,
	children,
}: EditDeleteButtonsProps) {
	return (
		<div className="relative w-full">
			{shouldShow && (
				<div className="absolute left-full transform -translate-x-1/2 flex gap-2 justify-start flex-col h-full px-4 -translate-y-6">
					<button
						onClick={onEditClick}
						className="text-gray-500 hover:text-gray-700 bg-yellow-100 hover:bg-yellow-200 border border-yellow-200 rounded-md p-3"
					>
						<FaEdit />
					</button>
					<button
						onClick={onDeleteClick}
						className="text-gray-500 hover:text-gray-700 bg-red-100 hover:bg-red-200 border border-red-200 rounded-md p-3"
					>
						<FaTrash />
					</button>
				</div>
			)}
			{children}
		</div>
	);
}

export default EditDeleteButtons;
