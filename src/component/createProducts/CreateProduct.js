import { Button, FormControl, Input, MenuItem, Select } from '@mui/material';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../config/firebase';
import { useState } from 'react';

const db = getFirestore(app);

const CreateProduct = () => {
	const [categoria, setCategoria] = useState('');
	const [costo, setCosto] = useState();
	const [descripcion1, setDescripcion1] = useState('');
	const [descripcion2, setDescripcion2] = useState('');
	const [nombre, setNombre] = useState('');
	const [porcentaje, setPorcentaje] = useState();
	const [stock, setStock] = useState();
	const [referencia, setReferencia] = useState('');
	const [unidades, setUnidades] = useState();
	const [cargando, setCargando] = useState(false);

	const cambioCategoria = (e) => {
		const value = e.target.value;
		setCategoria(value);
	};

	const cambioCosto = (e) => {
		const value = Number(e.target.value);
		setCosto(value);
	};

	const cambioDescripcion1 = (e) => {
		const value = e.target.value;
		setDescripcion1(value);
	};

	const cambioDescripcion2 = (e) => {
		const value = e.target.value;
		setDescripcion2(value);
	};

	const cambioNombre = (e) => {
		const value = e.target.value;
		setNombre(value);
	};

	const cambioPorcentaje = (e) => {
		const value = Number(e.target.value);
		setPorcentaje(value);
	};

	const cambioStock = (e) => {
		const value = Number(e.target.value);
		setStock(value);
	};

	const cambioRefencia = (e) => {
		const value = e.target.value;
		setReferencia(value);
	};

	const cambioUnidades = (e) => {
		const value = Number(e.target.value);
		setUnidades(value);
	};

	const enviar = (e) => {
		e.preventDefault();
		setCargando('Espere por favor');
		const ProductosRef = collection(db, 'ListadoProductos');
		const newProduct = {
			categoria: categoria,
			costo: costo,
			descripcion1: descripcion1,
			descripcion2: descripcion2,
			nombre: nombre,
			porcentaje: porcentaje,
			stock: stock,
			img: '',
		};

		addDoc(ProductosRef, newProduct).then((doc) => {
			setCargando(doc.id);
		});
	};
	const enviarOfertas = (e) => {
		e.preventDefault();
		setCargando('Espere por favor');
		const ProductosRef = collection(db, 'ListadoProductos');

		const newProduct = {
			categoria: 'ofertas',
			descripcion1: descripcion1,
			nombre: nombre,
			porcentaje: porcentaje,
			referencia: referencia,
			unidades: unidades,
		};

		addDoc(ProductosRef, newProduct).then((doc) => {
			setCargando(doc.id);
		});
	};

	return (
		<div>
			{cargando === false ? (
				<>
					<form>
						<FormControl>
							<label id='select-label'>CATEGORIA</label>
							<Select labelId='select-label' id='select' label='Pisos' value={categoria} onChange={cambioCategoria}>
								<MenuItem value={'autos'}>Autos</MenuItem>
								<MenuItem value={'baños'}>Baños</MenuItem>
								<MenuItem value={'bolsas'}>Bolsas</MenuItem>
								<MenuItem value={'cocina'}>Cocina</MenuItem>
								<MenuItem value={'insecticidas'}>Insecticidas</MenuItem>
								<MenuItem value={'otros'}>Otros</MenuItem>
								<MenuItem value={'pisos'}>Pisos</MenuItem>
								<MenuItem value={'ropa'}>Ropa</MenuItem>
								<MenuItem value={'gato'}>Gato</MenuItem>
								<MenuItem value={'perro'}>Perro</MenuItem>
							</Select>
							<label>COSTO</label>
							<Input type='number' onChange={cambioCosto} />
							<label>DESCRIPCION1</label>
							<Input type='text' onChange={cambioDescripcion1} />
							<label>DESCRIPCION2</label>
							<Input type='text' onChange={cambioDescripcion2} />
							<label>NOMBRE</label>
							<Input type='text' onChange={cambioNombre} />
							<label>PORCENTAJE</label>
							<Input type='number' onChange={cambioPorcentaje} />
							<label>STOCK</label>
							<Input type='number' onChange={cambioStock} />
							<Button onClick={enviar}>Guardar</Button>
						</FormControl>
					</form>
					<form>
						<FormControl>
							<h1>Ofertas</h1>
							<label>DESCRIPCION1</label>
							<Input type='text' onChange={cambioDescripcion1} />
							<label>NOMBRE</label>
							<Input type='text' onChange={cambioNombre} />
							<label>PORCENTAJE</label>
							<Input type='number' onChange={cambioPorcentaje} />
							<label>REFERENCIA</label>
							<Input type='text' onChange={cambioRefencia} />
							<label>UNIDADES</label>
							<Input type='text' onChange={cambioUnidades} />
							<Button onClick={enviarOfertas}>Guardar</Button>
						</FormControl>
					</form>
				</>
			) : (
				<div>
					<h1>{cargando}</h1>
					<button
						onClick={() => {
							setCargando(false);
						}}
					>
						Volver
					</button>
				</div>
			)}
		</div>
	);
};

export default CreateProduct;
