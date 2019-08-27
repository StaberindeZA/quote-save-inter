import { ADD_QUOTE, DELETE_QUOTE } from '../actionTypes';

import uuid from 'uuid';

const initialState = [
  {
    id: '123',
    text: 'When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love. - Marcus Aurelius'
  },
  {
    id: '234',
    text: 'If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment. - Marcus Aurelius'
  }
]

function quotes(state = initialState, action) {
  switch(action.type) {
    case ADD_QUOTE: {
      const newState = [
        ...state,
        {
          id: uuid.v4(),
          text: action.payload.text
        }
      ];

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