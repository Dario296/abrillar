import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
	const [carrito, setCarrito] = useState([]);

	const agregarCarrito = (producto) => {
		if (producto.cantidad >= 1) {
			setCarrito([...carrito, producto]);
		}
	};

	const estaEnCarrito = (ID) => {
		return carrito.some((item) => item.ID === ID);
	};

	const cantidad = () => {
		return carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
	};

	const sumarCantidad = (ID) => {
		let index = carrito.findIndex((item) => item.ID === ID);

		if (carrito[index].stock > carrito[index].cantidad) {
			carrito[index].cantidad += 1;
			setCarrito([...carrito]);
		}
	};

	const restarCantidad = (ID) => {
		let index = carrito.findIndex((item) => item.ID === ID);
		if (carrito[index].cantidad > 1) {
			carrito[index].cantidad -= 1;
			setCarrito([...carrito]);
		} else {
			eliminarProducto(ID);
		}
	};

	const eliminarProducto = (ID) => {
		setCarrito(carrito.filter((item) => item.ID !== ID));
	};

	const total = () => {
		return carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
	};

	const vaciarCarrito = () => {
		setCarrito([]);
	};

	return <Context.Provider value={{ carrito, agregarCarrito, estaEnCarrito, cantidad, eliminarProducto, total, vaciarCarrito, sumarCantidad, restarCantidad, setCarrito }}>{children}</Context.Provider>;
};

export const useContexto = () => {
	return useContext(Context);
};
