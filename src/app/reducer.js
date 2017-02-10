import { markTodoAsDone } from './constants';

const initialState = {
  2: {
    "id" : 2,
    "isCompleted" : true,
    "isEditable" : false,
    "name" : "test task"
  },
  3: {
    "id" : 3,
    "isCompleted" : false,
    "isEditable" : false,
    "name" : "good task :))))"
  },
  4: {
    "id" : 4,
    "isCompleted" : true,
    "isEditable" : false,
    "name" : "Julia tests this ***"
  },
  5: {
    "id" : 5,
    "isCompleted" : false,
    "isEditable" : false,
    "name" : "the last task for this list"
  }
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case markTodoAsDone:
      const newObj = Object.assign({}, state);
      newObj[action.payload].isCompleted = !state[action.payload].isCompleted;
      return newObj;
    default:
      return state;
  }
};
