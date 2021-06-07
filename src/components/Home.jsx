import React, {Fragment, useContext,useEffect} from 'react'
import AuthContext from '../context/auth/authContext'
import NewNote from '../components/NewNote'
import NotesList from '../components/NotesList'

const Home = () => {

    //Extraer informacion de autenticacion
    const authContext = useContext(AuthContext)
    const { usuarioAutenticado } = authContext

    
    useEffect(()=>{
        
        usuarioAutenticado()
        
        // eslint-disable-next-line
    },[])


    return ( 
        <Fragment>
                <NewNote />
                <NotesList />
        </Fragment>
     );
}
 
export default Home;