import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../config/firebase';
import TotalForTheDay from './TotalForTheDay';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Button } from "@mui/material";
import dayjs from 'dayjs';

const db = getFirestore(app);

const TotalForTheDayList = () => {
	const [ventas, setVentas] = useState([]);
	const [Fecha, setFecha] = useState(new Date().toLocaleDateString());
	const [busqueda, setBusqueda] = useState('');

	useEffect(() => {
		const ProductosRef = collection(db, 'Ventas');
		const q = query(ProductosRef, where('fecha', '==', Fecha));
		getDocs(q).then((resp) => {
			const ventasDelDia = resp.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
			setVentas(ventasDelDia);
		});
	}, [Fecha]);

	const total = () => {
		return ventas.reduce((acc, venta) => acc + parseInt(venta.total), 0);
	};
	
	const buscarFecha = () => {
		if (busqueda === '') return;
		let fechaFormateada = dayjs(busqueda).format('DD/MM/YYYY');
		setFecha(fechaFormateada);
		setBusqueda('')
	} 


	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={['DateField']}>
					<form>
						<DateField format="DD-MM-YYYY" onChange={(newValue) => setBusqueda(newValue)}/>
						<Button onClick={buscarFecha}>Buscar fecha</Button>
					</form>
				</DemoContainer>
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
						</tr>
					</thead>
					<tbody>
						{ventas.length > 0 ? (
							ventas.map((vta) => <TotalForTheDay key={vta.ID} productos={vta.items} />)
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
