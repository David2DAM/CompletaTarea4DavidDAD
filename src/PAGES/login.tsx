import "../App.css"
import { Alert, Box, Button, Card,  TextField, Typography } from '@mui/material'
import KeyIcon from '@mui/icons-material/Key';
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';
import { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom'

//Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from "../store/authSlice";

function Login() {

  const usr = "david"
  const psswd = "1234"
  //Segurisimo user y contraseña en codigo fuente :)

  const [usuario, setUser] = useState<string>('');
  const [contraseña, setPassword] = useState<string>('');
  //Estos son las variables que uso para guardar y comparar el inpur del usuario con las credenciales almacenadas
  const [login, setLoginStatus] = useState<string>("");
  //Es un control del login mediante un string, lo uso de manera que cuando el user pulsa el boton,
  //lo mando a una variable en la que comprueba si el login es correcto y dependiendo pasa a ser un string correcto o no
  //asi dando la respuesta correspondiente por pantalla

  const navigate = useNavigate()
  const dispatch = useDispatch()

      
  const handleSubmit=(e:any)=>{
    e.preventDefault()
    if(usr === usuario && psswd===contraseña){
      setLoginStatus("success")
    }else{
      setLoginStatus("error")
    }
  }
    //Uso este metodo de react que vigila que login (explicado arriba que es) sea succes o no, si lo es te manda a home 
    //Esto atraves de navigate  
      useEffect(() => {
    if (login === "success") {

        dispatch(authActions.login({
        name: usuario, //data.user es el nombre de usuario que ha ingresado el usuario
        rol: "administrador"
        }))
      
        navigate("/home")
    }
  })
  //Busque para como hacer uso del navigate por que en la tarea no se especifica, queria ponerlo justo despues de la 
  //navegacion para que se viese la confirmacion, pero no consigo que sea asi

  return (
    <>
    {/*Uso un card para diferenciar del fondo el propio login del codigo */}
      <Card elevation={3}  sx={{width:"350", borderRadius: 3, display:"flex", minWidth:1000}} >
        <Box padding={5} width="100%">

          <form  onSubmit={handleSubmit} style={{display:"grid"}}>
          <Box>
            <Typography variant='h3'>Sistema de acceso</Typography>
            <KeyIcon></KeyIcon>
          </Box>
        <br/>
      {/*Esto se puedde hacer con box y paddings pero no tengo ni el tiempo ni las ganas */}
        <TextField id="usuario" label="User" type="search" variant="standard" required onChange={(e) => setUser(e.target.value)}></TextField>
        <br/>
        <br/>

        <TextField id="contraseña" label="Password" type="password" variant="standard" required onChange={(e) => setPassword(e.target.value)}></TextField>
        <br/>
        <br/>
        
        <Button variant='contained' fullWidth type='submit'>
          Acceder
          </Button>
        </form>

        <br/>
          {login === 'success' && (
          <Alert icon={<CheckIcon fontSize="inherit"/> } severity='success'>
            Login correcto
          </Alert>
          
          )}
          {login === 'error' && (
            <Alert icon={<ErrorIcon fontSize='inherit'/>} severity='error'>
              Usuario o contraseña incorrectos.
            </Alert>
          )}
        </Box>
      </Card>
    </>
  )
}

export default Login
