import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import Router from './router';
import { ThemeProvider } from './shared/components/theme-provider';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import toastifyConfig from './config/toastify';
import './shared/styles/globals.css';

const queryClient = new QueryClient();

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<QueryClientProvider client={queryClient}>
				<ToastContainer {...toastifyConfig} />
				<Router />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
