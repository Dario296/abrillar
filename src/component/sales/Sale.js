import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Sale = ({ producto, handleAgregar, recargar }) => {
	const [cantidad, setCantidad] = useState('');
	const [precioT, setPrecioT] = useState('');

	useEffect(() => {
		setCantidad('');
		setPrecioT('');
	}, [recargar]);

	const C = Number(producto.costo);
	const P = Number(producto.porcentaje);
	const precioU = Math.round((C + (C * P) / 100) / 10) * 10;

	const handleChangeCantidad = (e) => {
		const value = e.target.value;
		setPrecioT(value * precioU);
		setCantidad(value);
	};

	const handleChangePrecio = (e) => {
		const value = e.target.value;
		const resultado = (value * 1) / precioU;
		setCantidad(resultado);
		setPrecioT(value);
	};

	const productoV = {
		ID: producto.ID,
		nombre: producto.nombre,
		cantidad: cantidad,
		precioTotal: precioT,
	};

	return (
		<tr>
			<td>{producto.nombre}</td>
			<td>{producto.stock}</td>
			<td>{precioU}</td>
			<td>
				<input className='inputVentas' onChange={handleChangeCantidad} type='number' name='cantidad' value={cantidad} />
			</td>
			<td>
				<input className='inputVentas' onChange={handleChangePrecio} type='number' name='precio' value={precioT} />
			</td>
			{producto.stock === 0 || cantidad === 0 || cantidad === undefined || cantidad === null || cantidad === '' ? (
				<Button className='agregarVentasD' disabled>
					<AddShoppingCartIcon />
				</Button>
			) : (
				<Button className='agregarVentas' onClick={() => handleAgregar({ ...productoV }, producto.ID)}>
					<AddShoppingCartIcon />
				</Button>
			)}
		</tr>
	);
};

export default Sale;
