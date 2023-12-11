import { createContext, useContext, useState } from 'react';

export const Context = createContext();

export const AdminProvider = ({ children }) => {
	const [admin, setAdmin] = useState(false);

	const iniciarAdmin = (nombre, contraseña) => {
		const admin = process.env.REACT_APP_ADMIN;
		const admin1 = process.env.REACT_APP_ADMIN1;
		const password = process.env.REACT_APP_PASSWORD;
		const password1 = process.env.REACT_APP_PASSWORD1;
		if ((nombre === admin || nombre === admin1) && (contraseña === password || contraseña === password1)) {
			setAdmin(true);
		}
	};

	const salir = () => {
		setAdmin(false);
	};

	return <Context.Provider value={{ admin, iniciarAdmin, salir }}>{children}</Context.Provider>;
};

export const useContextAdmin = () => {
	return useContext(Context);
};
