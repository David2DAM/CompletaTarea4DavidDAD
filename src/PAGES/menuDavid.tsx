//Importamos el useSelector del react-redux
import { useDispatch, useSelector } from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import type { RootState } from '../store/index';
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';
import { AppBar, Box, Button,  Drawer,  IconButton,  List,  ListItem,  ListItemButton,  ListItemIcon,  ListItemText,  Toolbar,  Tooltip,  Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import MenuIcon from '@mui/icons-material/Menu';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import React from 'react';
import { HelpOutline, Star } from '@mui/icons-material';

type MenuDavidProps = {
  origen: string;
};
//Esto es una solucion que encontre para pasar por parametro el nombre de la pagina y no tener que hacer 2
//Le pido un string en la llamada al componente y la detecto mediante esto, luego invoco la variable en el texto 

function menuDavid({ origen }: MenuDavidProps){
const navigate = useNavigate()
      const dispatch = useDispatch()

        //Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
        const userData = useSelector((state: RootState) => state.authenticator)
        //Comprobamos por la consola qué obtenemos del store
        console.log(userData)

        function HandleAction(){
            dispatch(authActions.logout())
            //Uso el mismo dispacht para salir que para entrar solo que en ved de login, pongo logout y como es un metodo voy que solo indica la salida
            //no me pide ningun parametro como nombre o rol
            navigate("/")
            //navigate(/) es para ir al root A.K.A el login de inicio
            //todo esto es simplemente un onclick del boton de mas abajo en el que solamente pone salir
        }
        //Antes de esto tendremos que coger del store los datos
        const isLoggedin = userData.isAutenticated
        //Tiene que ser magia, puse esto y empezo a funcionar, asi se va a quedar
        console.log(isLoggedin)

        useEffect(() => {
            if (!isLoggedin) {
                navigate('/')
            }
        }, [isLoggedin, navigate])

        function ponEmoji (){
            if(userData.userRol==="administrador"){
                return <SupervisorAccountIcon/>
            }else{
                return <HomeIcon/>
            }
        }

  const [open, setOpen] = React.useState(false);
  //Este es el estado del drawer, por defecto cerrado

    const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    //Lo que hace aqui es que cambia el estado del drawer
  };
  //Esta funcion es la que cambia el estado del drawer de la libreria de mui de drawer, no me pregunten por que usa dos lambdas https://mui.com/material-ui/react-drawer/

    const DrawerList = (    
    
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
            
            <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {<Star />}
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>

              {/* Quiero añadir un boton a cada pagina, lo hago añadiendo otro bloque directamente*/}
      <Link to="/reports" style={{ textDecoration: "none", color: "black" }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AllInboxIcon />
            </ListItemIcon>
            <ListItemText primary="Reportes" />
          </ListItemButton>
        </ListItem>
      </Link>

    {/* Añado un ultimo icono, como el drawer es comun a las 3 paginas por un tema de programacion eficiente vas a poder ir a tu misma pagina desde la misma lo cual no 
    deberia ser un problema segun yo, no lo da*/}
    <Link to="/Home" style={{ textDecoration: "none", color: "black" }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </Link>

<a href="/David_Rodriguez_Castellano_DAD_4.pdf" target="_blank" rel="noopener noreferrer" 
   style={{ textDecoration: "none", color: "black" }}>
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemIcon>
        <HelpOutline />
      </ListItemIcon>
      <ListItemText primary="Ayuda" />
    </ListItemButton>
  </ListItem>
</a>
    </Box>
    
   );
   //Aqui vamos a añadir nuestros items con sus iconos y un textito de a donde llevan


   
return(
    <>
    <AppBar position="fixed" sx={{ width: '100%', boxShadow: 3 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
            

          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            David
          </Typography>
        </Toolbar>

    </AppBar>
    <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
    </Drawer>

        <Typography>{origen} de david, Hola soy {userData.userName} y tengo el rol de {userData.userRol} </Typography>
        <Typography>{ponEmoji()}</Typography>

        <Tooltip describeChild title="Salir" arrow placement="top">
        <Button variant='contained' fullWidth type='submit' onClick={HandleAction}>
                Salir
        </Button>
        </Tooltip>
    </>
);
}
export default menuDavid
