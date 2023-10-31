import { useMemo, useRef, useState } from 'react';
import { BsImage } from 'react-icons/bs';
import { FaTimes, FaUpload } from 'react-icons/fa';

type UploadInputProps = {
	defaultFileUrl?: string;
	readOnly?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit?: (file: File) => void;
	onClear?: () => void;
};

export const PhotoUploadInput = ({
	defaultFileUrl,
	readOnly,
	onChange,
	onSubmit,
	onClear,
}: UploadInputProps) => {
	const [fileName, setFileName] = useState('');
	const [file, setFile] = useState<File | null>();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFileName(event.target.files?.[0]?.name ?? '');
		setFile(event.target.files?.[0] ?? null);
		onChange?.(event);
	};

	const handleUploadClick = () => {
		if (file) {
			onSubmit?.(file);
		}
	};

	const handleClearClick = () => {
		onClear?.();
		setFileName('');
		setFile(null);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const imgSrc = useMemo(() => {
		if (file) {
			return URL.createObjectURL(file);
		}
		return defaultFileUrl;
	}, [file, defaultFileUrl]);

	return (
		<div className="relative flex flex-col gap-2 w-32">
			<div
				className={`h-32 bg-gray-200 rounded-lg relative w-full flex items-center justify-center ${
					!readOnly ? 'cursor-pointer' : 'cursor-not-allowed'
				}`}
			>
				<input
					type="file"
					onChange={handleFileChange}
					className="absolute w-full h-full opacity-0"
					ref={inputRef}
					readOnly={readOnly}
					disabled={readOnly}
				/>
				<FaUpload
					className="w-8 h-8 text-white absolute"
					onClick={() => inputRef.current?.click()}
				/>
				{imgSrc ? (
					<img
						src={imgSrc}
						alt="Uploaded file"
						className="w-full h-full object-cover"
					/>
				) : (
					<BsImage className="w-full h-full p-8 text-gray-300" />
				)}
				<button
					type="button"
					className="absolute top-0 right-0 p-1 text-red-500 rounded-full bg-white hover:bg-red-100 mr-1 mt-1"
					onClick={handleClearClick}
				>
					<FaTimes className="w-4 h-4" />
				</button>
			</div>
			<p className="text-sm font-medium text-gray-700">
				{file ? 'Uploaded file' : fileName}
			</p>
			{!readOnly && (
				<button
					type="button"
					className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-600 w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
					onClick={handleUploadClick}
					disabled={!file}
				>
					{defaultFileUrl && file ? 'Substituir' : 'Upload'}
				</button>
			)}
		</div>
	);
};
