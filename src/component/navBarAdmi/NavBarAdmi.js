import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer, CssBaseline, Toolbar, List, Typography, IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useContextAdmin } from '../context/AdminContex';

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

export default function NavBarAdmi() {
	const [open, setOpen] = React.useState(false);
	const { salir } = useContextAdmin();

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
					<IconButton color='inherit' onClick={() => salir()}>
						Salir
					</IconButton>
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
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/' onClick={handleDrawerClose}>
							<ListItemText>Ventas</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
				<List>
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/ventasdeldia' onClick={handleDrawerClose}>
							<ListItemText>Ventas Del Dia</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
				<List>
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/totalmes' onClick={handleDrawerClose}>
							<ListItemText>Total del mes</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
				<List>
					<ListItem disablePadding>
						<ListItemButton as={Link} to='/editarproductos' onClick={handleDrawerClose}>
							<ListItemText>Editar productos</ListItemText>
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
