import React from 'react';

const TotalForTheDay = ({ productos }) => {
	return (
		<>
			{productos.map((item) => (
				<tr key={item.ID}>
					<td>{item.nombre}</td>
					<td>{item.cantidad}</td>
					<td>{item.precioTotal} </td>
				</tr>
			))}
		</>
	);
};

export default TotalForTheDay;
