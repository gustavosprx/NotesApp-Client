import React, { Fragment,useContext } from "react";
import noteContext from '../context/notes/noteContext'
import swal from 'sweetalert'

const Note = ({note}) => {

  // Extraer valores
  const notesContext =useContext(noteContext)
  const { eliminarNota } = notesContext

  // SweetAlert 
  const handleClick = (id) => {
    swal({
      title: "Deseas eliminar tu nota?",
      text: "No podras recuperarla una vez eliminada",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Tu nota ha sido eliminada!", {
          icon: "success",
        });
        //Eliminar nota
        eliminarNota(id)
      } else {
        swal("Tu nota esta segura!");
      }
    });
    
  }

  return (
    <Fragment>
      <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3">
        <div className="card ml-3 mr-3 mt-5">
          <div className="card-body">
            <p className="card-text"><b>{note.name}</b></p>
            <div className="d-grid gap-2">
              <button
                onClick={()=>{handleClick(note._id)}}
                className="btn btn-danger mt-2 text-center"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Note;
