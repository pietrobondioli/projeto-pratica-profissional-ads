import Modal, { ModalProps } from './modal';

type ConfirmationModalProps = ModalProps & {
	onConfirm: () => void;
	onDeny: () => void;
};

const ConfirmationModal = ({
	isOpen,
	onClose,
	onConfirm,
	onDeny,
	children,
}: ConfirmationModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="p-4">
				<h2 className="text-lg font-medium mb-4">Confirmar ação</h2>
				<p className="mb-4">{children}</p>
				<div className="flex justify-end">
					<button
						onClick={() => {
							onDeny();
							onClose?.();
						}}
						className="mr-2"
					>
						Cancelar
					</button>
					<button onClick={onConfirm}>Confirmar</button>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmationModal;
