import React from 'react';
import { useContexto } from '../context/CartContex';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
	const { carrito, cantidad, sumarCantidad, restarCantidad, eliminarProducto, total, vaciarCarrito } = useContexto();

	return (
		<>
			<div>
				<Table striped bordered hover size='sm' responsive>
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Cant.</th>
							<th>$ C/U</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{carrito.map((producto) => (
							<tr key={producto.ID}>
								<td>{producto.nombre}</td>
								<td>{producto.cantidad}</td>
								<td>{producto.precio}</td>
								<td>{producto.precio * producto.cantidad}</td>
								<td>
									<IconButton onClick={() => restarCantidad(producto.ID)}>
										<RemoveIcon />
									</IconButton>
								</td>
								<td>
									<IconButton onClick={() => sumarCantidad(producto.ID)}>
										<AddIcon />
									</IconButton>
								</td>
								<td>
									<IconButton onClick={() => eliminarProducto(producto.ID)}>
										<DeleteIcon />
									</IconButton>
								</td>
							</tr>
						))}
						<tr>
							<td></td>
							<td>{cantidad()}</td>
							<td></td>
							<td>{total()}</td>
						</tr>
					</tbody>
				</Table>
				<div className='Cart'>
					<IconButton onClick={() => vaciarCarrito()}>Vaciar carrito</IconButton>
					<IconButton as={Link} to='/realizarpedido'>
						Terminar pedido
					</IconButton>
				</div>
			</div>
		</>
	);
};

export default Cart;
