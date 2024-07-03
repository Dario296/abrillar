import React from 'react';

const OnCreditTotalForTheDay = ({ total, fecha, hora, nombre }) => {
	return (
		<tr>
			<td>{nombre}</td>
			<td>{total}</td>
			<td>{fecha}</td>
			<td>{hora}</td>
			<td>Pago</td>
		</tr>
	);
};

export default OnCreditTotalForTheDay;
