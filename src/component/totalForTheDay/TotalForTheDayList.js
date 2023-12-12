import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../config/firebase';
import TotalForTheDay from "./TotalForTheDay";

const db = getFirestore(app);

const TotalForTheDayList = () => {
	const [ventas, setVentas] = useState([]);
	const Fecha = new Date().toLocaleDateString();

	useEffect(() => {
		const ProductosRef = collection(db, 'Ventas');
		const q = query(ProductosRef, where('fecha', '==', Fecha));
		getDocs(q).then((resp) => {
			const ventasDelDia = resp.docs.map((doc) => ({Id: doc.id, ...doc.data() }));
			setVentas(ventasDelDia);
		});
	}, [Fecha]);

    const total = () => {
		return ventas.reduce((acc, venta) => acc + parseInt(venta.total), 0);
	};

	return (
		<>
			<div>
				<h1 className='text-center'>Total de Ventas del Día: {Fecha} ${total()}</h1>
				<table class='table table-striped mt-4 text-center'>
					<thead>
						<tr>
							<th scope='col'>Nombre del producto</th>
							<th scope='col'>Cantidad vendida</th>
							<th scope='col'>Monto total</th>
						</tr>
					</thead>
					<tbody>
						{ventas.length > 0 ? (
							ventas.map((vta) => (
                                <TotalForTheDay key={vta.Id} productos={vta.items}/>
							))
						) : (
							<tr>
								<td colSpan='5'>No hay registros para mostrar</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default TotalForTheDayList;
