import './App.css'
import Home from './PAGES/home'
import Reports from "./PAGES/reports"
import ErrorPage from './PAGES/error'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './PAGES/login';

const router = createBrowserRouter([
  {
  path: '/',
  errorElement: <ErrorPage/>,
  //La pagina del error TIENE que ir aqui si no da errores y no funciona, llevo mas tiempo aqui del que me gustaria admitir
  children: [
  {
    index: true,
    element: <Login/>
  },
  {
    path: 'home',
    //Esto es para ambos home y reports pero solo lo pondre en home
    //en el path no hay que poner la ruta del archivo puesto que ya la toma al importarlo arriba
    //lo que añado aqui es la ruta en la propia pagina, lo que tendre que poner yo en el propio codigo para acceder a ella
    //o el usuario en la barra de tarea para lo mismos
    element: <Home/>
  },
  {
    path: "reports",
    element: <Reports/>
    },

  ]
  },
]);
//Este es un enrutador de clase router con el que primero le paso el login siempre y luego le pasare las otras 2 paginas

function App() {

  return (
    <>
    {/*Aqui ya no tengo el login, es el router que me dirige en un primer momento al propio login y al resto */}
      <RouterProvider router={router}/>
    </>
  )
}

export default App
