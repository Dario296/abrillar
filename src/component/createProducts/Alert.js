import { IconButton } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";

const Alert = (codigo) => {
	return (
		<>
			<div>producto creado exitosamente</div>
			{/* <div>producto creado exitosamente {codigo}</div> */}
			<IconButton as={Link} to='/crearproducto'>
				Volver
			</IconButton>
		</>
	);
};

export default Alert;
