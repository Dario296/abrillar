import React, { useEffect, useState } from 'react';
import app from '../config/firebase';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import EditProduct from "./EditProduct";

const db = getFirestore(app);

const EditProductsList = () => {
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
	return (
        <>
            {pruductList.map((producto)=>(
                <EditProduct key={producto.Id} producto={producto} recargar={recargar} setRecargar={setRecargar}/>
            ))}
        </>
    );
};

export default EditProductsList;
