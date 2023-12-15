import { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
	const [carrito, setCarrito] = useState([]);

	useEffect(()=>{
		let carritoLocalStorage = localStorage.getItem('carrito');
		if (carritoLocalStorage) {
			setCarrito(JSON.parse(carritoLocalStorage));
		}
	},[])

	const agregarCarrito = (producto) => {
		if (producto.cantidad >= 1) {
			localStorage.setItem('carrito', JSON.stringify([...carrito, producto]))
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
			localStorage.setItem('carrito', JSON.stringify([...carrito]))
			setCarrito([...carrito]);
		}
	};

	const restarCantidad = (ID) => {
		let index = carrito.findIndex((item) => item.ID === ID);
		if (carrito[index].cantidad > 1) {
			carrito[index].cantidad -= 1;
			localStorage.setItem('carrito', JSON.stringify([...carrito]))
			setCarrito([...carrito]);
		} else {
			eliminarProducto(ID);
		}
	};

	const eliminarProducto = (ID) => {
		let filtrado = carrito.filter((item) => item.ID !== ID);
		localStorage.setItem("carrito", JSON.stringify(filtrado));
		setCarrito(filtrado);
	};

	const total = () => {
		return carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
	};

	const vaciarCarrito = () => {
		localStorage.removeItem("carrito");
		setCarrito([]);
	};

	return <Context.Provider value={{ carrito, agregarCarrito, estaEnCarrito, cantidad, eliminarProducto, total, vaciarCarrito, sumarCantidad, restarCantidad, setCarrito }}>{children}</Context.Provider>;
};

export const useContexto = () => {
	return useContext(Context);
};
