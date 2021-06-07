import React, { Fragment, useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AlertContext from '../context/alerts/alertContext'
import swal from 'sweetalert'


const NewNote = () => {

    // Extraer valores
    const notesContext = useContext(noteContext)
    const alertContext = useContext(AlertContext)
    const { alerta, mostrarAlerta } = alertContext
    const { form, mostrarFormulario, agregarNota } = notesContext

    const [note,saveNote] = useState({
        name:""
    })

    let { name } = note

    const handleOnChange = (e) => {
        saveNote({
            ...note,
            [e.target.name]:e.target.value
        })    
    }

    const handleOnClick = () => {
        if(name === ""){
            mostrarAlerta('La nota no puede estar vacia','alerta-error')
            return
        }

        // FUNCION QUE AGREGA LAS NOTAS AL DB
        agregarNota({name})
        mostrarFormulario(false)
        saveNote({name:""})
        swal("","Nota creada exitosamente!","success")

    }



    return ( 
        <Fragment>
        <div className="container">
                    
                    <div className="row">
                        <div className="col-md-3 mt-5">
                                <div className="d-grid gap-2">
                                    <button onClick={ () => mostrarFormulario(true) } className="btn btn-danger mt-2 text-center">Nueva Nota</button>
                                </div>     
                        </div>
                   </div>

                   {
                       form 
                        ? (
                            <div className="row">
                                <div className="col-md-3  mt-5">
                                    <div className=" justify-content-center">
                                        <div className="d-grid gap-2 mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                onChange={handleOnChange}
                                                autoComplete="off"
                                            
                                            />    
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button onClick={handleOnClick} className="btn btn-danger mt-2 text-center">Agregar Nota</button>
                                        </div>
                                        {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}  
                                    </div>
                                </div> 
                            </div>            
                        )
                        : null
                   }
        </div>
    </Fragment>
     );
}


export default NewNote;
