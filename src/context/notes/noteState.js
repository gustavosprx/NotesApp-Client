import React,{useReducer} from 'react';
import noteContext from '../notes/noteContext'
import noteReducer from '../notes/noteReducer'
import clienteAxios from '../../config/axios'
import { 
    FORMULARIO_NOTA,
    OBTENER_NOTAS,
    AGREGAR_NOTA,
    ELIMINAR_NOTA
 } from '../../types/index'

const NoteState = props => {

    const initialState = {
        notes:[],
        form : false
    }

    const[state,dispatch] = useReducer(noteReducer,initialState)

    //Funciones
    const mostrarFormulario = (data) => {
        dispatch({
            type:FORMULARIO_NOTA,
            payload:data
        })
    }

    const agregarNota = async name => {
        try {
            const resultado = await clienteAxios.post('/api/notes',name)
            console.log(resultado.data)
            dispatch({
                type:AGREGAR_NOTA,
                payload:resultado.data
            })
        } catch (error) {
            console.log(error + "errrorrrr")
        }
    } 

    const obtenerNotas = async () => {
        try {
            const resultado = await clienteAxios.get('/api/notes')

            dispatch({
                type:OBTENER_NOTAS,
                payload:resultado.data
            })


        } catch (error) {
            console.log(error)
        }
    }

    const eliminarNota = async(noteId) => {
        try {
            await clienteAxios.delete(`/api/notes/${noteId}`)

            dispatch({
                type:ELIMINAR_NOTA,
                payload:noteId
            })

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <noteContext.Provider
            value={{
                form:state.form,
                notes:state.notes,
                mostrarFormulario,
                agregarNota,
                obtenerNotas,
                eliminarNota
            }}
        >
            {props.children}
        </noteContext.Provider>
        
    )
}

export default NoteState;