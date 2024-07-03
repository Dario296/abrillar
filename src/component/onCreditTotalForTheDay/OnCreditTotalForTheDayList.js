import { collection, getDocs, getFirestore, query} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../config/firebase';
import OnCreditTotalForTheDay from './OnCreditTotalForTheDay';

const db = getFirestore(app);

const OnCreditTotalForTheDayList = () => {
	const [ventas, setVentas] = useState([]);

	useEffect(() => {
		const ProductosRef = collection(db, 'Fiados');
		const q = query(ProductosRef);
		getDocs(q).then((resp) => {
			const ventasDelDia = resp.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
			ventasDelDia.sort((a, b) => {
				let fa = a.fecha,
					fb = b.fecha;

				if (fa < fb) {
					return -1;
				}
				if (fa > fb) {
					return 1;
				}
				return 0;
			});
			setVentas(ventasDelDia);
		});
	}, []);

	return (
		<>
			<div>
				<h1 className='text-center'>
					Fiados
				</h1>
				<table class='table table-striped mt-4 text-center'>
					<thead>
						<tr>
							<th scope='col'>Persona</th>
							<th scope='col'>Monto total</th>
							<th scope='col'>Fecha</th>
							<th scope='col'>Hora</th>
						</tr>
					</thead>
					<tbody>
						{ventas.length > 0 ? (
							ventas.map((vta) => <OnCreditTotalForTheDay key={vta.ID} total={vta.total} fecha={vta.fecha} hora={vta.hora} nombre={vta.nombre}/>)
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

export default OnCreditTotalForTheDayList;
