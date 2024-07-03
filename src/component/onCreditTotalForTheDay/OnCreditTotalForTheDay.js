import { Button } from "@mui/material";
import { collection, deleteDoc, doc, getFirestore, addDoc } from "firebase/firestore";
import React from 'react';
import app from "../config/firebase";

const db = getFirestore(app);

const OnCreditTotalForTheDay = ({ total, fecha, hora, nombre, id, venta, recargar, setRecargar, setCargando }) => {
	
	const ventaRef = collection(db, 'Ventas');
	
	const eliminarFiados = async() =>{
		setCargando('Espere por favor');
		const ven = {
			fecha: fecha,
			hora: hora,
            items: venta.items,
			total: total,
		}
		await addDoc(ventaRef, ven);
        await deleteDoc(doc(db, 'Fiados', id));
		setRecargar(!recargar);
		setCargando(false);
    }

	return (
		<tr>
			<td>{nombre}</td>
			<td>{total}</td>
			<td>{fecha}</td>
			<td>{hora}</td>
			<td><Button onClick={eliminarFiados}>Pago</Button></td>
		</tr>
	);
};

export default OnCreditTotalForTheDay;
