import React, { useEffect, useState } from 'react';

const Sale = ({ producto, handleAgregar, recargar }) => {

	const [cantidad, setCantidad] = useState(0);
	const [precioT, setPrecioT] = useState(0);

	useEffect(()=>{
		setCantidad(0)
		setPrecioT(0)
	},[recargar])

	const C = Number(producto.costo)
	const P = Number(producto.porcentaje)
	const precioU = Math.round( ( C + ( C * P ) / 100 ) /10 ) * 10;

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
		Id: producto.Id,
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
				<input onChange={handleChangeCantidad} type='number' name='cantidad' value={cantidad} />
			</td>
			<td>
				<input onChange={handleChangePrecio} type='number' name='precio' value={precioT} />
			</td>
			{producto.stock > 0 ? (
				<>
					{ cantidad === 0 ? null : (
						<td>
							<button onClick={() => handleAgregar({ ...productoV }, producto.Id)}>Agregar a la venta</button>
						</td>
					)}
				</>
			) : null}
		</tr>
	);
};

export default Sale;
