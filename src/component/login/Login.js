import React, { useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { useContextAdmin } from '../context/AdminContex';

const Login = () => {
	const { iniciarAdmin } = useContextAdmin();

	const [datos, setDatos] = useState({
		nombre: '',
		password: '',
	});

	const cambioImput = (event) => {
		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<form className="formularioLogin">
			<FormControl className="controles">
				<InputLabel htmlFor='nombre'>Nombre</InputLabel>
				<Input onChange={cambioImput} name='nombre' aria-describedby='my-helper-text' required type='text' />
			</FormControl>
			<FormControl className="controles">
				<InputLabel htmlFor='password'>Password</InputLabel>
				<Input onChange={cambioImput} name='password' aria-describedby='my-helper-text' required type='password' />
			</FormControl>
			<Button type='submit' onClick={() => iniciarAdmin(datos.nombre, datos.password)}>
				Iniciar
			</Button>
		</form>
	);
};

export default Login;
