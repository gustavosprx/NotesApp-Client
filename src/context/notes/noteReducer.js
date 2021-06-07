import { 
  FORMULARIO_NOTA,
  OBTENER_NOTAS,
  AGREGAR_NOTA,
  ELIMINAR_NOTA
} from "../../types";


  const noteReducer = (state,action) => {
    switch (action.type) {
      case FORMULARIO_NOTA:
        return {
          ...state,
          form: action.payload,
        };

      case OBTENER_NOTAS:
        return {
          ...state,
          notes: action.payload
        };

        case AGREGAR_NOTA:
            return {
            ...state,
            notes: [...state.notes, action.payload],
        };

        case ELIMINAR_NOTA:
            return {
            ...state,
            notes: state.notes.filter(note => (note._id !== action.payload))
        };

      default:
        return state;
  }
}

export default noteReducer;