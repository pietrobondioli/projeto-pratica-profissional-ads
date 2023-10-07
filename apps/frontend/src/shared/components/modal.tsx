import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ModalProps = {
	isOpen: boolean;
	onClose?: () => void;
	children?: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
			}
		};

		if (isOpen) {
			document.body.classList.add('overflow-hidden');
			document.addEventListener('keydown', handleEscapeKey);
		} else {
			document.body.classList.remove('overflow-hidden');
			document.removeEventListener('keydown', handleEscapeKey);
		}

		return () => {
			document.body.classList.remove('overflow-hidden');
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div
				className="bg-white rounded-lg shadow-lg overflow-hidden"
				onClick={(event) => event.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
};

export default Modal;
