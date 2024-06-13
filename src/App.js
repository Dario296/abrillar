import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/styles.scss';

import PersistentDrawerLeft from './component/navBar/ResponsiveDrawer.js';
import NavBarAdmi from './component/navBarAdmi/NavBarAdmi.js';
import HeroSec from './component/hero/HeroSec.js';
import ProductsListContainer from './component/products/ProductsListContainer.js';
import ProductsListContainerOffers from './component/products/ProductsListContainerOffers.js';
import Particle from './component/particles/particles.jsx';
import Cart from './component/cart/cart.js';
import { useContextAdmin } from './component/context/AdminContex.js';
import { useContexto } from './component/context/CartContex.js';
import Login from './component/login/Login.js';
import SalesList from './component/sales/SalesList.js';
import WhatsappButton from './component/whatsapp/WhatsappButton.js';
import OrderForm from './component/orderForm/OrderForm.js';
import TotalForTheDayList from './component/totalForTheDay/TotalForTheDayList.js'
import EditProductsList from "./component/editProducts/EditProductsList.js";
import TotalForTheMonth from "./component/totalForTheMonth/TotalForTheMonth.js";
import CreateProduct from "./component/createProducts/CreateProduct.js";

function App() {
	const { admin } = useContextAdmin();
	const { carrito } = useContexto();
	return (
		<div className='App'>
			<BrowserRouter>
				{admin ? (
					<>
						<NavBarAdmi />
						<Routes>
							<Route path='/' element={<SalesList />}></Route>
							<Route path='/ventasdeldia' element={<TotalForTheDayList />}></Route>
							<Route path='/totalmes' element={<TotalForTheMonth />}></Route>
							<Route path='/editarproductos' element={<EditProductsList />}></Route>
							<Route path='/crearproducto' element={<CreateProduct />}></Route>
							<Route path='*' element={<Navigate to='/' />} />
						</Routes>
					</>
				) : (
					<>
						<Particle id='particles-js' />
						<PersistentDrawerLeft />
						<Routes>
							<Route path='/' element={<HeroSec />} />
							{carrito.length === 0 ? null : (
								<>
									<Route path='/carrito' element={<Cart />} />
									<Route path='/realizarpedido' element={<OrderForm />} />
								</>
							)}

							<Route path='/productos/:categoria' element={<ProductsListContainer />} />
							<Route path='/productos/ofertas' element={<ProductsListContainerOffers />} />
							<Route path='/admin' element={<Login />}></Route>
							<Route path='*' element={<Navigate to='/' />} />
						</Routes>
						<WhatsappButton />
					</>
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;
