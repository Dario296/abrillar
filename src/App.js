import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/styles.scss';

import PersistentDrawerLeft from './component/navBar/ResponsiveDrawer.js';
import NavBarAdmi from './component/navBarAdmi/NavBarAdmi.js';
import HeroSec from './component/hero/HeroSec.js';
import ProductsListContainer from './component/products/ProductsListContainer.js';
import Particle from './component/particles/particles.jsx';
import Cart from './component/cart/cart.js';
import { useContextAdmin } from './component/context/AdminContex.js';
import { useContexto } from './component/context/CartContex.js';
import Login from './component/login/Login.js';
import ShopingList from './component/shoping/ShopingList.js';
import WhatsappButton from './component/whatsapp/WhatsappButton.js';
import OrderForm from './component/orderForm/OrderForm.js';

function App() {
	const { admin } = useContextAdmin();
	const { carrito } = useContexto();
	return (
		<div className='App'>
			<BrowserRouter>
				{/* <HashRouter> */}
				{admin ? (
					<>
						<NavBarAdmi />
						<Routes>
							<Route path='/' element={<ShopingList />}></Route>
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
							<Route path='/admin' element={<Login />}></Route>
							<Route path='*' element={<Navigate to='/' />} />
						</Routes>
						<WhatsappButton />
					</>
				)}
				{/* </HashRouter> */}
			</BrowserRouter>
		</div>
	);
}

export default App;
