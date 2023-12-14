import React, { useEffect, useState } from 'react';
import RecipeReviewCardOffers from '../card/CardOffers';
import { Grid } from '@mui/material';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import app from '../config/firebase';

const db = getFirestore(app);

const ProductsListContainer = () => {
	const [pruductList, setProductList] = useState([]);

	useEffect(() => {
		const ProductosRef = collection(db, 'ListadoProductos');
		const Respuesta = query(ProductosRef, where('categoria', '==', 'ofertas'));
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
	}, []);

	return (
		<Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }} direction='row' justifyContent='space-around' alignItems='center'>
			{pruductList.map((producto) => (
				<Grid item key={producto.ID}>
					<RecipeReviewCardOffers producto={producto}/>
				</Grid>
			))}
		</Grid>
	);
};

export default ProductsListContainer;
