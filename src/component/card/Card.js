import * as React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useContexto } from '../context/CartContex';

export default function RecipeReviewCard({ producto }) {
	const [cantidad, setCantidad] = React.useState(0);
	const { agregarCarrito, estaEnCarrito } = useContexto();

	const C = producto.costo;
	const P = producto.porcentaje;
	const precio = Math.round((C + (C * P) / 100) / 10) * 10;

	const handleSumar = () => {
		if (cantidad < producto.stock) {
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
			ID: producto.ID,
			nombre: producto.nombre,
			precio,
			cantidad: cantidad,
			stock: producto.stock,
		};
		agregarCarrito(productoAgregar);
	};

	return (
		<Card className='Card'>
			<CardHeader title={producto.nombre} action={precio} />
			<CardMedia component='img' height='194' image={producto.img} alt='Imagen del producto' />
			<CardContent>
				{/* {producto.stock > 0 ? <Typography className='Descripcion'>Stock: {producto.stock}</Typography> : null} */}
				<Typography className='Descripcion'>{producto.descripcion1}</Typography>
				{producto.descripcion2 ? <Typography className='Descripcion'>({producto.descripcion2})</Typography> : null}
			</CardContent>
			{estaEnCarrito(producto.ID) ? null : (
				<CardActions disableSpacing>
					{producto.stock > 0 ? (
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
					) : (
						<Typography>No hay stock de este producto</Typography>
					)}
				</CardActions>
			)}
		</Card>
	);
}
