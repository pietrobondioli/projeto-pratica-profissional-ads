import { ThemeProvider } from './shared/components/theme-provider';
import Router from './shared/router';

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Router />
		</ThemeProvider>
	);
}

export default App;
