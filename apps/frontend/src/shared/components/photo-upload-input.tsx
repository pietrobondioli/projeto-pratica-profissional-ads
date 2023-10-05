import { useMemo, useRef, useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import { FaTimes, FaUpload } from 'react-icons/fa';

type UploadInputProps = {
	defaultFileUrl?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit?: (file: File) => void;
	onClear?: () => void;
};

export const PhotoUploadInput = ({
	defaultFileUrl,
	onChange,
	onSubmit,
	onClear,
}: UploadInputProps) => {
	const [fileName, setFileName] = useState('');
	const [file, setFile] = useState<File | null>();
	const inputRef = useRef<HTMLInputElement>(null);

	console.log(file);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFileName(event.target.files?.[0]?.name ?? '');
		onChange?.(event);
		setFile(event.target.files?.[0] ?? null);
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
			<div className="relative flex items-center justify-center h-32 bg-gray-200 rounded-lg">
				<>
					<input
						type="file"
						onChange={handleFileChange}
						className="absolute w-full h-full opacity-0 cursor-pointer"
						ref={inputRef}
					/>
					<FaUpload
						className="w-8 h-8 text-white absolute cursor-pointer"
						onClick={() => inputRef.current?.click()}
					/>
					{imgSrc ? (
						<img
							src={imgSrc}
							alt="Uploaded file"
							className="w-full h-full object-cover"
						/>
					) : (
						<BsCardImage className="w-full h-full object-cover" />
					)}
					<button
						type="button"
						className="absolute top-0 right-0 p-1 text-red-500 rounded-full bg-white hover:bg-red-100 mr-1 mt-1"
						onClick={handleClearClick}
					>
						<FaTimes className="w-4 h-4" />
					</button>
				</>
			</div>
			<p className="text-sm font-medium text-gray-700">
				{file ? 'Uploaded file' : fileName}
			</p>
			<button
				type="button"
				className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-600 w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
				onClick={handleUploadClick}
				disabled={!file}
			>
				{file ? 'Replace' : 'Upload'}
			</button>
		</div>
	);
};
