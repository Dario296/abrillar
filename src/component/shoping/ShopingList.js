import React, { useEffect, useState } from 'react';
import Shoping from './Shoping';
import { getFirestore, collection, getDocs, query, getDoc, updateDoc, doc, addDoc } from 'firebase/firestore';
import app from '../config/firebase';

const db = getFirestore(app);

const ShopingList = () => {
	const [venta, setVenta] = useState([]);
	const [pruductList, setProductList] = useState([]);
	const [cantidad, setCantidad] = useState(0);
	const [precioT, setPrecioT] = useState(0);
	const [recargar, setRecargar] = useState(true);
	

	useEffect(() => {
		const ProductosRef = collection(db, 'ListadoProductos');
		const Respuesta = query(ProductosRef);
		getDocs(Respuesta).then((resp) => {
			const ProductosDB = resp.docs.map((doc) => ({ Id: doc.id, ...doc.data() }));
			setProductList(ProductosDB);
		});
	}, [recargar]);

	const handleAgregar = (producto, id) => {
		if (venta.some((item) => item.Id === id) === false) {
			setVenta([...venta, producto]);
		}
	};

	const total = () => {
		return venta.reduce((acc, producto) => acc + parseInt(producto.precioTotal), 0);
	};

	const compra = {
		fecha: new Date().toLocaleDateString(),
		items: venta,
		total: total(),
	}

	const confirmarVenta = () => {
		venta.forEach((item) =>{
			const ProductosRef = doc(db, 'ListadoProductos', item.Id);
			getDoc(ProductosRef)
				.then((doc) => {
					updateDoc(ProductosRef, {
						stock: doc.data().stock - item.cantidad
					})
				})
		})
		const ventaRef = collection(db, 'Ventas');
		addDoc(ventaRef, compra)
			.then(() => {
				setVenta([]);
				setCantidad(0);
				setPrecioT(0);
				setRecargar(!recargar)
			})
	};

	return (
		<>
			<div>Total venta:{total()}</div>
			{venta.length === 0 ? null : <button onClick={confirmarVenta}>Confirmar venta</button>}
			<table className='tablaVentas'>
				<tr>
					<th>Nombre</th>
					<th>Stock</th>
					<th>PrecioUni</th>
					<th>Cantidad</th>
					<th>PrecioT.</th>
				</tr>
				{pruductList.map((producto) => (
					<Shoping key={producto.id} producto={producto} handleAgregar={handleAgregar} venta={venta} cantidad={cantidad} setCantidad={setCantidad} precioT={precioT} setPrecioT={setPrecioT} />
				))}
			</table>
		</>
	);
};

export default ShopingList;
