import { createContext, useContext, useEffect, useState } from 'react';

export const Context = createContext();

export const AdminProvider = ({ children }) => {
	const [admin, setAdmin] = useState(false);

	useEffect(()=>{
		let adminLog = JSON.parse(localStorage.getItem('admin'));
		if (adminLog) {setAdmin(true)}
	},[])

	const iniciarAdmin = (nombre, contraseña) => {
		const admin = process.env.REACT_APP_ADMIN;
		const admin1 = process.env.REACT_APP_ADMIN1;
		const password = process.env.REACT_APP_PASSWORD;
		const password1 = process.env.REACT_APP_PASSWORD1;
		if ((nombre === admin || nombre === admin1) && (contraseña === password || contraseña === password1)) {
			localStorage.setItem("admin", JSON.stringify(true));
			setAdmin(true);
		}
	};

	const salir = () => {
		localStorage.removeItem("admin");
		setAdmin(false);
	};

	return <Context.Provider value={{ admin, iniciarAdmin, salir }}>{children}</Context.Provider>;
};

export const useContextAdmin = () => {
	return useContext(Context);
};
