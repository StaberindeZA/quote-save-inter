import { ADD_QUOTE, DELETE_QUOTE, EDIT_QUOTE } from '../actionTypes';

const initialState2 = null;

export function quotes(state = initialState2, action) {
  switch(action.type) {
    case ADD_QUOTE: {

      // Update the state in store
      let newState = [];
      if(state) {
        newState = [
          ...state,
          {
            id: action.payload.id,
            text: action.payload.text,
            author: action.payload.author,
            dateadded: action.payload.dateadded
          }
        ];
      } else {
        newState = [
          {
            id: action.payload.id,
            text: action.payload.text,
            author: action.payload.author,
            dateadded: action.payload.dateadded
          }
        ]
      };
      return newState;
    }
    case EDIT_QUOTE: {
      const quoteIndex = state.findIndex((q) => q.id === action.payload.id);
      const newState = [
        ...state.slice(0, quoteIndex),
        {
          id: action.payload.id,
          text: action.payload.text,
          author: action.payload.author,
          dateadded: action.payload.dateadded
        },
        ...state.slice(quoteIndex + 1, state.length),
      ];
      // return state.map((q) => {
      //   if(q.id === action.payload.id) {
      //     q.author = action.payload.text;
      //     q.text = action.payload.text;
      //   }
      // });
      return newState;
    }
    case DELETE_QUOTE: {
      return state.filter(q => q.id !== action.payload.id)
    }
    default:
      return state;
  };
}

export default quotes;