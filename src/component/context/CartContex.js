import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
	const [carrito, setCarrito] = useState([]);

	const agregarCarrito = (producto) => {
		if (producto.cantidad >= 1) {
			setCarrito([...carrito, producto]);
		}
	};

	const estaEnCarrito = (id) => {
		return carrito.some((item) => item.id === id);
	};

	const cantidad = () => {
		return carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
	};

	const sumarCantidad = (id) => {
		let index = carrito.findIndex((item) => item.id === id);

		if (carrito[index].stock > carrito[index].cantidad) {
			carrito[index].cantidad += 1;
			setCarrito([...carrito]);
		}
	};

	const restarCantidad = (id) => {
		let index = carrito.findIndex((item) => item.id === id);
		if (carrito[index].cantidad > 1) {
			carrito[index].cantidad -= 1;
			setCarrito([...carrito]);
		} else {
			eliminarProducto(id);
		}
	};

	const eliminarProducto = (id) => {
		setCarrito(carrito.filter((item) => item.id !== id));
	};

	const total = () => {
		return carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
	};

	const vaciarCarrito = () => {
		setCarrito([]);
	};

	const terminarCompra = (id) => {
		alert(`Gracias por su compra nimero de orden: ${id}`);
		setCarrito([]);
	};

	return <Context.Provider value={{ carrito, agregarCarrito, estaEnCarrito, cantidad, eliminarProducto, total, vaciarCarrito, terminarCompra, sumarCantidad, restarCantidad, setCarrito }}>{children}</Context.Provider>;
};

export const useContexto = () => {
	return useContext(Context);
};
