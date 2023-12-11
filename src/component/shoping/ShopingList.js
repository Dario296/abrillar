import React, { useState } from 'react';
import Shoping from './Shoping';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import app from '../config/firebase';

const db = getFirestore(app)

const ShopingList = () => {
	const [venta, setVenta] = useState([]);
	const [pruductList, setProductList] = useState([]);
		const ProductosRef = collection(db, 'ListadoProductos');
		const Respuesta = query(ProductosRef);
		getDocs(Respuesta)
			.then((resp) => {
				const ProductosDB = resp.docs.map((doc) => ({ Id: doc.id, ...doc.data() }));
				setProductList(ProductosDB);
			});

	const handleAgregar = (producto) => {
		setVenta([...venta, producto]);
	};

	const total = () => {
		return venta.reduce((acc, producto) => acc + parseInt(producto.precioTotal), 0);
	};
	
	const confirmarVenta = () =>{
		console.log("hola");
		
	}

	return (
		<>
			<div>Total venta:{total()}</div>
			{venta.length === 0? null: <button onClick={confirmarVenta}>Confirmar venta</button>}
			<table className="tablaVentas">
				<tr>
					<th>Nombre</th>
					<th>Stock</th>
					<th>PrecioUni</th>
					<th>Cantidad</th>
					<th>PrecioT.</th>
				</tr>
				{pruductList.map((producto) => (
					<Shoping key={producto.id} producto={producto} handleAgregar={handleAgregar} venta={venta} />
				))}
			</table>
		</>
	);
};

export default ShopingList;
