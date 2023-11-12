import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './AppProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Serene';

createInertiaApp({
	title: (title) => `${title} | ${appName}`,
	resolve: (name) => AppProvider,
	// resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx'))
	// return resolvePageComponent(`./Routes/index.tsx`, import.meta.glob('./Routes/**/*.tsx'))
	setup({ el, App, props }) {
		const root = createRoot(el);
		root.render(<App {...props} />);
	},
	progress: {
		color: '#4B5563',
	},
});

