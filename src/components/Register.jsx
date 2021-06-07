import React, { Fragment, useState, useContext, useEffect } from 'react'
import AlertContext from '../context/alerts/alertContext'
import AuthContext from '../context/auth/authContext'
import { useHistory } from 'react-router-dom'


const Register = () => {

    // extraer valores
    const alertContext = useContext(AlertContext)
    const { alerta, mostrarAlerta } = alertContext

    const authContext = useContext(AuthContext)
    const { mensaje, autenticado, registrarUsuario } = authContext

    const history = useHistory()

    // En caso de que el usuario se haya autenticado o sea un registro duplicado
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
        name:"",
        email:"",
        password:"",
        confirm:""
    })

    const { name, email, password, confirm } = user
    
    // Guarda los ingresado en el state
    const handleOnChange = e => {
        saveUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

        // Cuando el usuario quiere iniciar sesion
        const handleOnSubmit = e => {
            e.preventDefault()
   
            // Validar que no haya campos vacios
           if( name.trim()==='' || email.trim()==='' || password.trim()==='' ||
           confirm.trim()==='' ){
               mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
               return
           }
   
            // Password al minimo de 6 caracteres
           if(password.length < 6){
               mostrarAlerta('La contraseña debe ser de al menos 6 caracteres', 'alerta-error')
               return
           }
   
            // Los 2 passwords son iguales
            if(password !== confirm){
                mostrarAlerta('Las contraseñas no son iguales', 'alerta-error')
                return
            }
   
            // Pasarlo al action
            registrarUsuario({
                name,
                email,
                password
            })

       }



    return ( 
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form  onSubmit={handleOnSubmit} className="register" autoComplete="off">
                            <h2 className="registerH2 mb-3">Registrate!</h2>
                            <div className="registerName mb-3">
                                <label className="form-label">Nombre Completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="registerEmail mb-3">
                                <label className="form-label">Correo Electronico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="registerPassword mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="registerPassword mb-3">
                                <label className="form-label">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirm"
                                    value={confirm}
                                    onChange={handleOnChange}

                                />
                            </div>
                            <div className="d-grid gap-2">
                            <input
                                type="submit" 
                                className="btn btn-danger" 
                                value="Registrase"
                            />
                            </div>
                            {alerta ?<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
                        </form>
                    </div>
                </div>
            </div>
       </Fragment>
     );
}
 
export default Register;