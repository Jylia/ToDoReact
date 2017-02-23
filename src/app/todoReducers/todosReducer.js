import _ from 'lodash';
import { 
  createTodo,
  setData,
  setItem,
} from '../constants';

const initialTodosState = {}

export default function todosReducer(state = initialTodosState, action) {
  switch (action.type) {
    case createTodo:
      var idsArray = [];
      for (var objKey in state) {
        if (!state.hasOwnProperty(objKey)) continue;
        idsArray.push(parseInt(objKey, 10));
      }
      var newId = Math.max.apply(null, idsArray) + 1;
      return {
        ...state,
        [newId]: {
          "id" : newId,
          "isCompleted" : false,
          "isEditable" : false,
          "name" : action.payload.name
        }
      };

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
