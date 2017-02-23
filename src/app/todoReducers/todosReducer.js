import _ from 'lodash';
import { 
  setData,
  setItem,
} from '../constants';

const initialTodosState = {}

export default function todosReducer(state = initialTodosState, action) {
  switch (action.type) {
    case setData:
      return action.payload.entities.reduce((acc, item) => ({
        ...acc,
        [item.id]: item,
      }), {});

    case setItem:
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    default:
      return state;
  }
}
