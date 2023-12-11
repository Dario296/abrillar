import React, { useEffect, useState } from 'react';
import RecipeReviewCard from '../card/Card';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import app from '../config/firebase';

const db = getFirestore(app);

const ProductsListContainer = () => {
	const { categoria } = useParams();
	const [pruductList, setProductList] = useState([]);

	useEffect(() => {
		const ProductosRef = collection(db, 'ListadoProductos');
		const Respuesta = query(ProductosRef, where('categoria', '==', categoria));
		getDocs(Respuesta).then((resp) => {
			const ProductosDB = resp.docs.map((doc) => ({ Id: doc.id, ...doc.data() }));
			setProductList(ProductosDB);
		});
	}, [categoria]);

	return (
		<Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }} direction='row' justifyContent='space-around' alignItems='center'>
			{pruductList.map((producto) => (
				<Grid item key={producto.id}>
					<RecipeReviewCard producto={producto} />
				</Grid>
			))}
		</Grid>
	);
};

export default ProductsListContainer;
