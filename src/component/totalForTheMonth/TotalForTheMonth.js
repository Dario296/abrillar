import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../config/firebase';

const db = getFirestore(app);

const TotalForTheMonth = () => {
	const [ventas, setVentas] = useState([]);

	useEffect(() => {
		const fecha = new Date();
		const hoy = fecha.getDate();
		const mesActual = fecha.getMonth() + 1;
		const anio = fecha.getFullYear();
		let diasDelMes = [];
		for (let i = 1; i <= hoy; i++) {
			let fechasCompletas = `${i}/${mesActual}/${anio}`;
			diasDelMes.push(fechasCompletas);
		}

		if (diasDelMes.length > 30) {
			let diaUno = diasDelMes.shift();
			const ProductosRef = collection(db, 'Ventas');
			const q = query(ProductosRef, where('fecha', '==', diaUno), where('fecha', 'in', diasDelMes));
			getDocs(q).then((resp) => {
				const ventasDelMes = resp.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
				setVentas(ventasDelMes);
			});
		}

		const ProductosRef = collection(db, 'Ventas');
		const q = query(ProductosRef, where('fecha', 'in', diasDelMes));
		getDocs(q).then((resp) => {
			const ventasDelMes = resp.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
			setVentas(ventasDelMes);
		});
	}, []);

	const total = () => {
		return ventas.reduce((acc, venta) => acc + parseInt(venta.total), 0);
	};

	return (
		<>
			<div>
				<h1 className='text-center'>Total de Ventas del Mes: ${total()}</h1>
			</div>
		</>
	);
};

export default TotalForTheMonth;
