import { ADD_QUOTE, DELETE_QUOTE } from '../actionTypes';

const initialState = [
  {
    id: '123',
    text: 'When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love. - Marcus Aurelius',
    author: 'Marcus Aurelius',
    dateadded: new Date()
  },
  {
    id: '234',
    text: 'If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment. - Marcus Aurelius',
    author: 'Marcus Aurelius',
    dateadded: new Date()
  }
];

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
    case DELETE_QUOTE: {
      return state.filter(q => q.id !== action.payload.id)
    }
    default:
      return state;
  };
}

export default quotes;