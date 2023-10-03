type FormItemProps = {
	children: React.ReactNode;
};

export function FormItem({ children }: FormItemProps) {
	return <div className="flex flex-col gap-1">{children}</div>;
}

type FormLabelProps = {
	children: React.ReactNode;
};

export function FormLabel({ children }: FormLabelProps) {
	return <label className="text-gray-700">{children}</label>;
}

type FormMessageProps = {
	children: React.ReactNode;
};

export function FormMessage({ children }: FormMessageProps) {
	return <p className="text-red-500 text-sm">{children}</p>;
}
