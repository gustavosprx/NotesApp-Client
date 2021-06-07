import React, { useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'


 const Navbar = () => {


        //Extraer informacion de autenticacion
        const authContext = useContext(AuthContext)
        const { usuario, usuarioAutenticado, cerrarSesion} = authContext
        
        //Cambiar href de home dependiendo si el usuariario esta autenticado
        if(usuario) { var href = "/home" }
        else {  href="/" }

        useEffect(()=>{
            usuarioAutenticado()  
             // eslint-disable-next-line  
        },[])


     return (
       <div className="row">
         <nav className="navbar navbar-default" role="navigation">
           <div className="navbar-header justify-content-start">
             <a className="navbar-brand" href={href}>
               NotesApp
             </a>
           </div>

           {usuario ? (
             <div className="navbar-header justify-content-start">
               <ul className=" nav navbar justify-content-end">
                 <li>
                    <span className="navbar-brand text-center"><b>Bienvenid@ {usuario.name}!</b></span>
                 </li>
                 <li className="nav-item">
                   <Link
                     className="nav-link btn btn-blank"
                     onClick={() => cerrarSesion()}
                     to={"/login"}
                   >
                     Cerrar Sesion
                   </Link>
                 </li>
               </ul>
             </div>
           ) : (
             <ul className=" nav navbar justify-content-end">
               <li className="nav-item">
                 <Link
                   className="nav-link btn btn-blank"
                   to={"/register"}
                 >
                   Registrate
                 </Link>
               </li>
               <li className="nav-item">
                 <Link
                   className="nav-link btn btn-blank"
                   to={"/login"}
                 >
                   Ingresa
                 </Link>
               </li>
             </ul>
           )}
         </nav>
       </div>
     );
 }
  
 export default Navbar;