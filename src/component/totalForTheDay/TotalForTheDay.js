import React from 'react';

const TotalForTheDay = ({ productos, hora }) => {
	return (
		<>
			{productos.map((item) => (
				<tr key={item.ID}>
					<td>{item.nombre}</td>
					<td>{item.cantidad}</td>
					<td>{item.precioTotal} </td>
					<td>{hora? hora:""} </td>
				</tr>
			))}
		</>
	);
};

export default TotalForTheDay;
