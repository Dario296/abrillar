import * as React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useContexto } from '../context/CartContex';

export default function RecipeReviewCard({ producto }) {
	const [cantidad, setCantidad] = React.useState(0);
	const { agregarCarrito, estaEnCarrito } = useContexto();

	const handleSumar = () => {
		if (cantidad < producto.stock ) {
			setCantidad(cantidad + 1);
		}
	};

	const handleRestar = () => {
		if (cantidad > 0) {
			setCantidad(cantidad - 1);
		}
	};

	const handleAgregar = () => {
		let productoAgregar = {
			nombre: producto.nombre,
			precio: Math.round((producto.costo + (producto.costo * producto.porcentaje) / 100) / 10) * 10,
			cantidad: cantidad,
		};
		agregarCarrito(productoAgregar);
	};

	return (
		<Card className='Card' sx={{ maxWidth: 345, minWidth: 280 }}>
			<CardHeader title={producto.nombre} action={Math.round((producto.costo + (producto.costo * producto.porcentaje) / 100) / 10) * 10} />
			<CardMedia component='img' height='194' image={producto.img} alt="Imagen del producto" />
			<CardContent>
				<Typography className='Descripcion'>Stock: {producto.stock}</Typography>
				<Typography className='Descripcion'>{producto.decripcion1}</Typography>
				{producto.decripcion2 ?<Typography className='Descripcion'>({producto.decripcion2})</Typography> : null}
			</CardContent>
			{estaEnCarrito(producto.id) ? null : (
				<CardActions disableSpacing>
					{producto.stock > 0 ?
					<>
					<IconButton className='Restar' onClick={handleRestar}>
						<RemoveIcon />
					</IconButton>
					<Typography className='Cantidad'>{cantidad}</Typography>
					<IconButton className='Sumar' onClick={handleSumar}>
						<AddIcon />
					</IconButton>
					<IconButton onClick={handleAgregar} className='Añadir'>
						<Typography>Añadir</Typography>
						<AddShoppingCartIcon />
					</IconButton>
					</>
					: <Typography>No hay stock de este producto</Typography>}
				</CardActions>
			)}
		</Card>
	);
}
