import React, { useEffect, useState } from 'react';
import OnCredit from './OnCredit';
import { getFirestore, collection, getDocs, query, addDoc, writeBatch, where, documentId } from 'firebase/firestore';
import app from '../config/firebase';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

const db = getFirestore(app);

const OnCreditList = () => {
	const [venta, setVenta] = useState([]);
	const [pruductList, setProductList] = useState([]);
	const [recargar, setRecargar] = useState(true);
	const [cargando, setCargando] = useState(false);
	const [nombre, setNombre] = useState('');

	useEffect(() => {
		const ProductosRef = collection(db, 'ListadoProductos');
		const Respuesta = query(ProductosRef);
		getDocs(Respuesta).then((resp) => {
			const ProductosDB = resp.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
			ProductosDB.sort((a, b) => {
				let fa = a.nombre.toLowerCase(),
					fb = b.nombre.toLowerCase();

				if (fa < fb) {
					return -1;
				}
				if (fa > fb) {
					return 1;
				}
				return 0;
			});
			setProductList(ProductosDB);
		});
	}, [recargar]);

	const cambioNombre = (e) => {
		const value = e.target.value;
		setNombre(value);
	};

	const handleAgregar = (producto, ID) => {
		if (venta.some((item) => item.ID === ID) === false) {
			setVenta([...venta, producto]);
		}
	};

	const total = () => {
		return venta.reduce((acc, producto) => acc + parseInt(producto.precioTotal), 0);
	};

	const compra = {
		fecha: new Date().toLocaleDateString(),
		hora: new Date().toLocaleTimeString(),
		items: venta,
		total: total(),
		nombre: nombre,
	};

	const confirmarVenta = async () => {
		setCargando('Espere por favor');
		const batch = writeBatch(db);
		const ProductosRef = collection(db, 'ListadoProductos');
		const ventaRef = collection(db, 'Fiados');

		const q = query(
			ProductosRef,
			where(
				documentId(),
				'in',
				venta.map((item) => (item.IDRef ? item.IDRef : item.ID))
			)
		);

		const noHayStock = [];

		const productos = await getDocs(q);
		productos.docs.forEach((doc) => {
			const itemInCart = venta.find((item) => (item.IDRef ? item.IDRef : item.ID === doc.id));
			if (doc.data().stock >= itemInCart.cantidad) {
				batch.update(doc.ref, {
					stock: doc.data().stock - itemInCart.cantidad,
				});
			} else {
				noHayStock.push({
					nombre: doc.data().nombre,
				});
			}
		});

		if (noHayStock.length === 0) {
			batch.commit().then(() => {
				addDoc(ventaRef, compra).then(() => {
					setVenta([]);
					setRecargar(!recargar);
					setCargando(false);
				});
			});
		} else {
			setVenta([]);
			setCargando(false);
			alert('No hay stock suficiente para los siguientes productos: ' + noHayStock.map((i) => i.nombre));
		}
	};

	return (
		<>
		<h1>Fiados</h1>
			{cargando === false ? (
				<>
					<div>
						<div>
							<span>Total venta:{total()}</span>
						</div>
						{venta.length === 0 ? null : (
							<div>
								<span>Cant. Produc.{venta.length}</span>
								<form onSubmit={confirmarVenta}>
									<label>Nombre</label>
									<input required onChange={cambioNombre}/>
									<Button className='confirmarVenta' type="submit">
										Confirmar venta
									</Button>
								</form>
								
							</div>
						)}
					</div>

					<Table striped bordered hover size='sm' responsive>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Stock</th>
								<th>$ C/U</th>
								<th>Cant.</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{pruductList.map((producto) => (
								<OnCredit key={producto.ID} producto={producto} handleAgregar={handleAgregar} venta={venta} recargar={recargar} />
							))}
						</tbody>
					</Table>
				</>
			) : (
				<div>
					<h1>{cargando}</h1>
				</div>
			)}
		</>
	);
};

export default OnCreditList;
