import React from 'react';
import { useContexto } from '../context/CartContex';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';

const Cart = () => {
	const { carrito, cantidad, sumarCantidad, restarCantidad, eliminarProducto, total, vaciarCarrito } = useContexto();

	return (
		<>
			<div className='Cart'>
				<table className='TablaCarrito'>
					<tr>
						<th className='columna'>Id</th>
						<th className='columna'>Nombre</th>
						<th className='columna'>Cantidad</th>
						<th className='columna'>PrecioU.</th>
						<th className='columna'>PrecioT.</th>
					</tr>
					{carrito.map((producto) => (
						<tr key={producto.id}>
							<td className='columna'>{producto.id}</td>
							<td className='columna'>{producto.nombre}</td>
							<td className='columnaN'>{producto.cantidad}</td>
							<td className='columnaN'>{producto.precio}</td>
							<td className='columnaN'>{producto.precio * producto.cantidad}</td>
							<td className='columna'>
								<IconButton onClick={() => restarCantidad(producto.id)}>
									<RemoveIcon />
								</IconButton>
							</td>
							<td className='columna'>
								<IconButton onClick={() => sumarCantidad(producto.id)}>
									<AddIcon />
								</IconButton>
							</td>
							<td className='columna'>
								<IconButton onClick={() => eliminarProducto(producto.id)}>Eliminar</IconButton>
							</td>
						</tr>
					))}
					<tr>
						<td></td>
						<td></td>
						<td className='columnaNT'>Cantidad: {cantidad()}</td>
						<td></td>
						<td className='columnaNT'>Total: {total()}</td>
					</tr>
				</table>
				<IconButton onClick={() => vaciarCarrito()}>Vaciar carrito</IconButton>
				<IconButton as={Link} to='/realizarpedido'>
					Terminar pedido
				</IconButton>
			</div>
		</>
	);
};

export default Cart;
