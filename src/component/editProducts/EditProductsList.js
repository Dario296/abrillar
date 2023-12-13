import React, { useEffect, useState } from 'react';
import app from '../config/firebase';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import EditProduct from './EditProduct';
import { Table } from 'react-bootstrap';

const db = getFirestore(app);

const EditProductsList = () => {
	const [pruductList, setProductList] = useState([]);
	const [recargar, setRecargar] = useState(true);
	useEffect(() => {
		const ProductosRef = collection(db, 'ListadoProductos');
		const Respuesta = query(ProductosRef);
		getDocs(Respuesta).then((resp) => {
			const ProductosDB = resp.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
			setProductList(ProductosDB);
		});
	}, [recargar]);
	return (
		<Table striped bordered hover size='sm' responsive>
			<tbody>
				{pruductList.map((producto) => (
					<EditProduct key={producto.ID} producto={producto} recargar={recargar} setRecargar={setRecargar} />
				))}
			</tbody>
		</Table>
	);
};

export default EditProductsList;
