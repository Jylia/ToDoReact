import { 
  markTodoAsDone,
  deleteTodo,
  setIsEditableTodo,
  setIsNotEditableTodo
} from './constants';

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
  const newObj = Object.assign({}, state);
  switch (action.type) {
    case markTodoAsDone:
      newObj[action.payload].isCompleted = !state[action.payload].isCompleted;

      return newObj;

    case deleteTodo:
      delete newObj[action.payload];

      return newObj;

    case setIsEditableTodo:
      newObj[action.payload].isEditable = true;

      return newObj;

    case setIsNotEditableTodo:
      newObj[action.payload.taskId].isEditable = false;
      newObj[action.payload.taskId].name = action.payload.name;

      return newObj;

    default:
      return state;
  }
};
