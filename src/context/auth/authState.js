import React, { useReducer } from 'react';
import AuthContext from './authContext'
import AuthReducer from './authReducer'



import clienteAxios from '../../config/axios'
import authToken from '../../config/tokenAuth'

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION
 } from '../../types/index'

 const AuthState = props => {

     const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario:null,
        mensaje:null,
        cargando:true
     }

     const [state,dispatch] = useReducer(AuthReducer,initialState)

     
    // Funciones

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {

        const token = localStorage.getItem('token')

        authToken(token)

        try {
            const respuesta = await clienteAxios.get('/api/auth')

            dispatch({
                type:OBTENER_USUARIO,
                payload:respuesta.data
            })

        } catch (error) {

            dispatch({
                type:LOGIN_ERROR
            })
        }
                
    }


    const registrarUsuario = async datos => {

        try {
             const respuesta = await clienteAxios.post('/api/users', datos)

             dispatch({
                 type: REGISTRO_EXITOSO,
                 payload:respuesta.data
             })

             usuarioAutenticado()

        } catch (error) {


            const alerta = {
                msg: error.response.data,
                categoria: 'alerta-error'
            }

             dispatch({
                 type:REGISTRO_ERROR,
                 payload:alerta
             })
        }
    }

    // Cuando el usuario inicia sesion
    const iniciarSesion = async datos =>{

        try {
            
            const respuesta = await clienteAxios.post('/api/auth', datos)
            
            dispatch({
                type:LOGIN_EXITOSO,
                payload:respuesta.data.token
            })

            //Obtener el usuario
            usuarioAutenticado()
        } catch (error) {
             console.log(error)
            const alerta = {
                msg: error.response.data,
                categoria: 'alerta-error'
            }   

            dispatch({
                type:LOGIN_ERROR,
                payload:alerta
            })
        }
    }
    
    //Cierra la sesion del usuario
    const cerrarSesion = () => {
        dispatch({
            type:CERRAR_SESION
        })
    }


    return(
        <AuthContext.Provider
            value={{
                token:state.token,
                autenticado:state.autenticado,
                usuario:state.usuario,
                mensaje:state.mensaje,
                cargando:state.cargando, 
                registrarUsuario,       
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >{props.children}

        </AuthContext.Provider>
    )
}

 export default AuthState