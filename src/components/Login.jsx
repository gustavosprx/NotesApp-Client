import React, { Fragment, useState, useContext, useEffect } from 'react';
import AlertContext from '../context/alerts/alertContext';
import AuthContext from '../context/auth/authContext';
import {useHistory} from 'react-router-dom';

const Login = () => {

    // Extraer valores
    const alertContext = useContext(AlertContext)
    const { alerta, mostrarAlerta } = alertContext

    const authContext = useContext(AuthContext)
    const { mensaje, autenticado, iniciarSesion } = authContext

    const history = useHistory()

    // En caso de que usuario o password no exista
    useEffect(()=>{

        if(autenticado){
            history.push('/home')
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg , mensaje.categoria)
        }
        
         // eslint-disable-next-line
    },[mensaje,autenticado,history])


    const [ user, saveUser ] = useState({
        email:"",
        password:"",
    })

    const { email, password } = user
    
    // Guarda los ingresado en el state
    const handleOnChange = e => {
        saveUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

        // Cuando el usuario quiere iniciar sesion
        const handleOnSubmit = async (e) => {
            e.preventDefault()
            
            // Validar que no haya campos vacios
            if(email.trim() === '' || password.trim() === ''){
                mostrarAlerta('Todos los campos son obligatorios','alerta-error')
                return
            }

            // pasarlo al action
            iniciarSesion({email,password})

       }


    return (
      <Fragment>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <form onSubmit={handleOnSubmit} className="login" autoComplete="off">
                <h2 className="loginH2 mb-3">Inicio de sesión</h2>
                <div className="loginEmail mb-3">
                  <label className="form-label">Usuario</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="loginPassword mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="d-grid gap-2">
                  <input
                    className="btn btn-danger"
                    type="submit"
                    value="Ingresar"
                  />
                </div>
                {alerta ? (
                  <div className={`alerta ${alerta.categoria}`}>
                    {alerta.msg}
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
}
 
export default Login;