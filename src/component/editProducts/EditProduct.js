import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Button, FormControl, Input } from '@mui/material';
import app from '../config/firebase';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

const db = getFirestore(app);

const EditProduct = ({ producto, recargar, setRecargar }) => {
	const [open, setOpen] = useState(false);
	const [stock, setStock] = useState(producto.stock);
	const [costo, setCosto] = useState(producto.costo);
	const [porcentaje, setPorcentaje] = useState(producto.porcentaje);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const cambioStock = (e) => {
		const value = e.target.value;
		setStock(value);
	};

	const cambioCosto = (e) => {
		const value = e.target.value;
		setCosto(value);
	};

	const cambioPorcentaje = (e) => {
		const value = e.target.value;
		setPorcentaje(value);
	};

	const guardarCambios = () => {
		const docRef = doc(db, 'ListadoProductos', producto.Id);
		updateDoc(docRef, {
			stock: Number(stock),
			costo: Number(costo),
			porcentaje: Number(porcentaje),
		}).then(() => {
			console.log('Se actualizaron los datos correctamente');
			handleClose();
			setRecargar(!recargar);
		});
	};

	return (
		<div>
			<div>
				<div>{producto.nombre}</div>
				<TriggerButton type='button' onClick={handleOpen}>
					Editar producto
				</TriggerButton>
				<Modal aria-labelledby='unstyled-modal-title' aria-describedby='unstyled-modal-description' open={open} onClose={handleClose} slots={{ backdrop: StyledBackdrop }}>
					<ModalContent sx={{ width: 400 }}>
						<form>
							<FormControl>
								<label>Nuevo STOCK</label>
								<Input onChange={cambioStock} type='number' value={stock} />
							</FormControl>
							<FormControl>
								<label>Nuevo COSTO</label>
								<Input onChange={cambioCosto} type='number' value={costo} />
							</FormControl>
							<FormControl>
								<label>PORCENTAJE DE VENTA</label>
								<Input onChange={cambioPorcentaje} type='number' value={porcentaje} />
							</FormControl>
							<Button onClick={handleClose}>Salir</Button>
							<Button onClick={guardarCambios}>Guardar</Button>
						</form>
					</ModalContent>
				</Modal>
			</div>
		</div>
	);
};

const Backdrop = React.forwardRef((props, ref) => {
	const { open, className, ...other } = props;
	return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
});

Backdrop.propTypes = {
	className: PropTypes.string.isRequired,
	open: PropTypes.bool,
};

const blue = {
	200: '#99CCFF',
	300: '#66B2FF',
	400: '#3399FF',
	500: '#007FFF',
	600: '#0072E5',
	700: '#0066CC',
};

const grey = {
	50: '#F3F6F9',
	100: '#E5EAF2',
	200: '#DAE2ED',
	300: '#C7D0DD',
	400: '#B0B8C4',
	500: '#9DA8B7',
	600: '#6B7A90',
	700: '#434D5B',
	800: '#303740',
	900: '#1C2025',
};

const Modal = styled(BaseModal)`
	position: fixed;
	z-index: 1300;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
	z-index: -1;
	position: fixed;
	inset: 0;
	background-color: rgb(0 0 0 / 0.5);
	-webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
	({ theme }) => css`
		font-family: 'IBM Plex Sans', sans-serif;
		font-weight: 500;
		text-align: start;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 8px;
		overflow: hidden;
		background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
		border-radius: 8px;
		border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
		box-shadow: 0 4px 12px ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
		padding: 24px;
		color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

		& .modal-title {
			margin: 0;
			line-height: 1.5rem;
			margin-bottom: 8px;
		}

		& .modal-description {
			margin: 0;
			line-height: 1.5rem;
			font-weight: 400;
			color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
			margin-bottom: 4px;
		}
	`
);

const TriggerButton = styled('button')(
	({ theme }) => css`
		font-family: 'IBM Plex Sans', sans-serif;
		font-weight: 600;
		font-size: 0.875rem;
		line-height: 1.5;
		padding: 8px 16px;
		border-radius: 8px;
		transition: all 150ms ease;
		cursor: pointer;
		background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
		border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
		color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

		&:hover {
			background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
			border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
		}

		&:active {
			background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
		}

		&:focus-visible {
			box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
			outline: none;
		}
	`
);

export default EditProduct;
