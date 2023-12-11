import React, { useState } from 'react';
import { useContexto } from '../context/CartContex';
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select } from '@mui/material';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import app from '../config/firebase';

const db = getFirestore(app);

const OrderForm = () => {
	const { carrito, total, vaciarCarrito } = useContexto();

	const [datos, setDatos] = useState({
		nombre: '',
		direccion: '',
		telefono: '',
		formaDePago: '',
	});

	let Total = total();

	const cambioImput = (event) => {
		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		});
	};

	function enviarPedido() {
		let productos = carrito.map((producto) => `${producto.cantidad}-${producto.nombre}: $${producto.precio}.    `);
		productos.join('\n').split('., ').join('. ');
		let cliente = `${datos.nombre}. ${datos.direccion}. ${datos.telefono}. ${datos.formaDePago}`;
		let mensaje = productos + `Total: ${Total}. ` + cliente;
		window.location.href = 'https://api.whatsapp.com/send?phone=5493516062623&text=Me%20interesan%20los%20siguientes%20productos%20%20%20' + mensaje;
	}

	const ConfirmaCompra = async (e) => {
		e.preventDefault();

		const orden = {
			// fecha: new Date().toLocaleDateString(),
			Comprador: datos,
			Items: carrito,
			Total: total(),
		};

		const ordenesRef = collection(db, 'Pedidos');
		addDoc(ordenesRef, orden).then((doc) => {
			enviarPedido();
			vaciarCarrito();
		});
	};

	return (
		<form className="formularioPedido">
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<FormControl>
						<InputLabel>Nombre</InputLabel>
						<Input onChange={cambioImput} name='nombre' aria-describedby='my-helper-text' required type='text' />
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormControl>
						<InputLabel>Direccion</InputLabel>
						<Input onChange={cambioImput} name='direccion' aria-describedby='my-helper-text' required type='text' />
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormControl>
						<InputLabel>Telefono</InputLabel>
						<Input onChange={cambioImput} name='telefono' aria-describedby='my-helper-text' required type='number' />
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormControl>
						Forma de pago
						<Select onChange={cambioImput} name='formaDePago'>
							<MenuItem value={'Efectivo'}>Efectivo</MenuItem>
							<MenuItem value={'Transferencia bancaria'}>Transferencia bancaria</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			{datos.nombre === '' || datos.direccion === '' || datos.telefono === '' || datos.formaDePago === '' ? (
				<></>
			) : (
				<Button type='submit' onClick={ConfirmaCompra}>
					Confirmar Pedido
				</Button>
			)}
		</form>
	);
};

export default OrderForm;
