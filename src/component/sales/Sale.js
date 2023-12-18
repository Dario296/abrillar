import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import app from '../config/firebase';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

const Sale = ({ producto, handleAgregar, recargar }) => {
	const [cantidad, setCantidad] = useState('');
	const [precioT, setPrecioT] = useState('');

	const [pruductRef, setProductRef] = useState([]);

	useEffect(() => {
		if (producto.referencia) {
			const ProducRefDB = doc(db, 'ListadoProductos', producto.referencia);
			getDoc(ProducRefDB).then((resp) => {
				const produc = resp.data();
				setProductRef(produc);
			});
		}
	}, []);

	useEffect(() => {
		setCantidad('');
		setPrecioT('');
	}, [recargar]);

	let C
	let P

	if (producto.referencia) {
		C = Number(pruductRef.costo) * producto.unidades;
		P = Number(producto.porcentaje);
	}
	else{
		C = Number(producto.costo);
		P = Number(producto.porcentaje);
	}

	const precioU = Math.round((C + (C * P) / 100) / 10) * 10;

	const handleChangeCantidad = (e) => {
		const value = e.target.value;
		setPrecioT(value * precioU);
		setCantidad(value);
	};

	const handleChangePrecio = (e) => {
		const value = e.target.value;
		const resultado = (value * 1) / precioU;
		setCantidad(resultado.toFixed(2));
		setPrecioT(value);
	};

	let productoV 

	if (producto.referencia) {
		productoV = {
			ID: producto.referencia,
			nombre: producto.nombre,
			cantidad: cantidad * producto.unidades,
			precioTotal: precioT,
		}
	}else{
		productoV = {
			ID: producto.ID,
			nombre: producto.nombre,
			cantidad: cantidad,
			precioTotal: precioT,
		};
	}

	return (
		<tr>
			{producto.categoria === 'ofertas' ? (
				<>
				<td>{producto.nombre}</td>
				<td>{Math.floor(pruductRef.stock / producto.unidades)}</td>
				<td>{precioU}</td>
				<td>
					<input className='inputVentas' onChange={handleChangeCantidad} type='number' name='cantidad' value={cantidad} />
				</td>
				<td>
					<input className='inputVentas' onChange={handleChangePrecio} type='number' name='precio' value={precioT} disabled />
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
			</>
			) : (
				<>
					<td>{producto.nombre}</td>
					<td>{Math.round(producto.stock).toFixed(2)}</td>
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
				</>
			)}
		</tr>
	);
};

export default Sale;
