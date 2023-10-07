import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<FaExclamationTriangle className="text-6xl text-yellow-500 mb-4" />
			<h1 className="text-2xl font-bold mb-2">Página não encontrada</h1>
			<p className="text-gray-700 mb-4">
				A página que você está procurando não existe ou foi removida.
			</p>
			<div>
				<Link
					to="/"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
				>
					Ir para a página inicial
				</Link>
				<button
					className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => navigate(-1)}
				>
					Voltar
				</button>
			</div>
		</div>
	);
};

export default NotFoundPage;
