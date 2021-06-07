import React,{ Fragment, useEffect, useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import Note from '../components/Note'

const NotesList = () => {

    // Extraer valores
    const notesContext = useContext(noteContext)
    const { notes, obtenerNotas } = notesContext

    useEffect(()=>{
        obtenerNotas()
         // eslint-disable-next-line    
    },[])

    if( notes.length === 0 ) return null

    return(
        <Fragment>
            <div className="container">
                <div className="row">
                    {
                        notes.map(note => (
                            <Note
                                key={note._id}
                                note={note}
                            />
                        ) )
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default NotesList; 