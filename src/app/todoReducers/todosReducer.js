import _ from 'lodash';
import { 
  markTodoAsDone,
  deleteTodo,
  setIsEditableTodo,
  createTodo,
  setData,
  setItem,
  markAllAsDone
} from '../constants';

const initialTodosState = {}

export default function todosReducer(state = initialTodosState, action) {
  switch (action.type) {
    case markTodoAsDone:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          isCompleted: !state[action.payload].isCompleted
        }
      };

    case markAllAsDone:
      return Object.entries(state).reduce((acc, [key, taskItem]) => ({
        ...acc,
        [key]: {
          ...taskItem,
          isCompleted: !action.payload.isAllMarkedAsDone
        }
      }), {});

    case deleteTodo:
      return _.omit(state, action.payload);

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