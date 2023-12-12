import React, { useEffect, useState } from 'react';
import Sale from './Sale';
import { getFirestore, collection, getDocs, query, addDoc, writeBatch, where, documentId } from 'firebase/firestore';
import app from '../config/firebase';

const db = getFirestore(app);

const SalesList = () => {
	const [venta, setVenta] = useState([]);
	const [pruductList, setProductList] = useState([]);
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
	};

	const confirmarVenta = async () => {
		const batch = writeBatch(db);
		const ProductosRef = collection(db, 'ListadoProductos');
		const ventaRef = collection(db, 'Ventas');

		const q = query(
			ProductosRef,
			where(
				documentId(),
				'in',
				venta.map((item) => item.Id)
			)
		);

		const noHayStock = [];

		const productos = await getDocs(q);
		productos.docs.forEach((doc) => {
			const itemInCart = venta.find((item) => item.Id === doc.id);
			if (doc.data().stock >= itemInCart.cantidad) {
				batch.update(doc.ref, {
					stock: doc.data().stock - itemInCart.cantidad,
				});
			} else {
				noHayStock.push({
					nombre: doc.data().nombre,
					});

				// noHayStock.push(itemInCart);
			}
		});

		if (noHayStock.length === 0) {
			batch.commit().then(() => {
				addDoc(ventaRef, compra).then(() => {
					setVenta([]);
					setRecargar(!recargar);
				});
			});
		} else {
			setVenta([]);
			alert('No hay stock suficiente para los siguientes productos: ' + noHayStock.map((i) => i.nombre));
		}
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
					<Sale key={producto.id} producto={producto} handleAgregar={handleAgregar} venta={venta} recargar={recargar} />
				))}
			</table>
		</>
	);
};

export default SalesList;
