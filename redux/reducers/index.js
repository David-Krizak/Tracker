// redux/reducers/index.js
import {
  DODAJ_UNOS,
  UREDI_UNOS,
  OBRISI_UNOS,
  UPDATE_TOTAL_NORMA,
} from "../actions";

const initialState = {
  unos: [],
  totalNorma: 0, // Initialize totalNorma in your state
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case DODAJ_UNOS:
      return {
        ...state,
        unos: [...state.unos, action.payload],
      };
    case UREDI_UNOS:
      return {
        ...state,
        unos: state.unos.map((item, index) =>
          index === action.index ? action.payload : item
        ),
      };
    case OBRISI_UNOS:
      const noviUnosi = [...state.unos];
      noviUnosi.splice(action.index, 1);
      return {
        ...state,
        unos: noviUnosi,
      };
    case UPDATE_TOTAL_NORMA:
      return {
        ...state,
        totalNorma: action.totalNorma, // Update the totalNorma
      };

    default:
      return state;
  }
};

export default rootReducer;
