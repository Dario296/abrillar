import React from 'react';

const Shoping = ({ producto, handleAgregar, cantidad, setCantidad, precioT, setPrecioT }) => {
	const precioU = Math.round((producto.costo + (producto.costo * producto.porcentaje) / 100) / 10) * 10;

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

export default Shoping;
