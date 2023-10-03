import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router';
import { ThemeProvider } from './shared/components/theme-provider';
import './shared/styles/globals.css';

const queryClient = new QueryClient();

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<QueryClientProvider client={queryClient}>
				<Router />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
