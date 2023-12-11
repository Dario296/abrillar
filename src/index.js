import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AdminProvider } from './component/context/AdminContex';
import { Provider } from './component/context/CartContex.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AdminProvider>
			<Provider>
				<App />
			</Provider>
		</AdminProvider>
	</React.StrictMode>
);
