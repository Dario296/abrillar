import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../config/firebase';
import TotalForTheDay from './TotalForTheDay';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const db = getFirestore(app);

const TotalForTheDayList = () => {
	const [ventas, setVentas] = useState([]);
	const [Fecha, setFecha] = useState(new Date().toLocaleDateString());

	useEffect(() => {
		const ProductosRef = collection(db, 'Ventas');
		const q = query(ProductosRef, where('fecha', '==', Fecha));
		getDocs(q).then((resp) => {
			const ventasDelDia = resp.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
			ventasDelDia.sort((a, b) => {
				let fa = a.hora,
					fb = b.hora;

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
	}, [Fecha]);

	const total = () => {
		return ventas.reduce((acc, venta) => acc + parseInt(venta.total), 0);
	};

	const buscarFecha = (value) => {
		console.log(value);
		let fechaFormateada = dayjs(value).format('D/M/YYYY');
		setFecha(fechaFormateada);
	}

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar onChange={(newValue) => buscarFecha(newValue)}/>
			</LocalizationProvider>
			<div>
				<h1 className='text-center'>
					Total de Ventas del Día: {Fecha} ${total()}
				</h1>
				<table class='table table-striped mt-4 text-center'>
					<thead>
						<tr>
							<th scope='col'>Nombre del producto</th>
							<th scope='col'>Cantidad vendida</th>
							<th scope='col'>Monto total</th>
							<th scope='col'>Hora</th>
						</tr>
					</thead>
					<tbody>
						{ventas.length > 0 ? (
							ventas.map((vta) => <TotalForTheDay key={vta.ID} productos={vta.items} hora={vta.hora}/>)
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
