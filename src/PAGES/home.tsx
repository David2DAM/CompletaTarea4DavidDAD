//Importamos el useSelector del react-redux
import { useDispatch, useSelector } from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import type { RootState } from '../store/index';
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';
import { Box} from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import MenuDavid from './menuDavid.tsx'
import Dashboard from "../components/dashboard.tsx"
//Trozo de código donde vamos a usar el useEffect(): siempre los hooks van al principio del componente


    function Home(){
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


        
            
    return <>
        <Box>

            
            <MenuDavid origen="Home"/>
            <Dashboard/>

            
        </Box>
    </>
}
export default Home


