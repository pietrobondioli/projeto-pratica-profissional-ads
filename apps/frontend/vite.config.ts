import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
	const port = Number(process.env.PORT) || 3000;

	return defineConfig({
		plugins: [react()],
		resolve: {
			alias: {
				'#/fe': path.resolve(__dirname, './src'),
			},
		},
		server: {
			port,
		},
		preview: {
			port,
			host: true,
		},
	});
});
