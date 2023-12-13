import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer, CssBaseline, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemText, Badge } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useContexto } from '../context/CartContex';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
	const [open, setOpen] = React.useState(false);
	const { cantidad } = useContexto();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar className='NavBar' position='fixed' open={open}>
				<Toolbar className='Flex'>
					<IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' sx={{ mr: 2, ...(open && { display: 'none' }) }}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div' as={Link} to='/' onClick={handleDrawerClose}>
						***ABrillar***
					</Typography>
					{cantidad() === 0 ? (
						<div></div>
					) : (
						<IconButton color='inherit' as={Link} to='/carrito'>
							<Badge badgeContent={cantidad()}>
								<ShoppingCartIcon />
							</Badge>
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant='persistent'
				anchor='left'
				open={open}
			>
				<DrawerHeader className='NavBar'>
					<IconButton onClick={handleDrawerClose}>
						<CloseIcon />
					</IconButton>
				</DrawerHeader>
				<List>
					<ListItem>
						<ListItemText>Productos de limpieza</ListItemText>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/productos/autos' onClick={handleDrawerClose}>
							<ListItemText>Autos</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
				<List>
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/productos/baños' onClick={handleDrawerClose}>
							<ListItemText>Baño</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
				<List>
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/productos/bolsas' onClick={handleDrawerClose}>
							<ListItemText>Bolsas</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
				<List>
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/productos/cocina' onClick={handleDrawerClose}>
							<ListItemText>Cocina</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
				<List>
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/productos/insecticidas' onClick={handleDrawerClose}>
							<ListItemText>Insecticidas</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
				<List>
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/productos/pisos' onClick={handleDrawerClose}>
							<ListItemText>Pisos</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
				<List>
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/productos/ropa' onClick={handleDrawerClose}>
							<ListItemText>Ropa</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem>
						<ListItemText>Alimentos balanceados</ListItemText>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/productos/gato' onClick={handleDrawerClose}>
							<ListItemText>Gato</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
				<List>
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/productos/perro' onClick={handleDrawerClose}>
							<ListItemText>Perro</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
			</Main>
		</Box>
	);
}
