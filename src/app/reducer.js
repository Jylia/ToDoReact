import { 
  markTodoAsDone,
  deleteTodo,
  setIsEditableTodo,
  editTodo,
  markAllAsDone,
  createTodo
} from './constants';

const initialState = {
  tasks: {
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
  },
  isAllMarkedAsDone: false
};

export default function todosReducer(state = initialState, action) {
  var newObj = Object.assign({}, state);
  var newTasksObj = Object.assign({}, state.tasks);
  switch (action.type) {
    case markTodoAsDone:
      newTasksObj[action.payload].isCompleted = !state.tasks[action.payload].isCompleted;
      newObj.tasks = newTasksObj;
      return newObj;

    case deleteTodo:
      delete newTasksObj[action.payload];
      newObj.tasks = newTasksObj;
      return newObj;

    case setIsEditableTodo:
      newTasksObj[action.payload].isEditable = true;
      newObj.tasks = newTasksObj;
      return newObj;

    case editTodo:
      newTasksObj[action.payload.taskId].isEditable = false;
      newTasksObj[action.payload.taskId].name = action.payload.name;
      newObj.tasks = newTasksObj;
      return newObj;

    case markAllAsDone:
      newObj['isAllMarkedAsDone'] = !newObj['isAllMarkedAsDone'];
      for (var key in newTasksObj) {
        if (!newTasksObj.hasOwnProperty(key)) continue;
        newTasksObj[key].isCompleted = newObj['isAllMarkedAsDone'];
      }
      newObj.tasks = newTasksObj;
      return newObj;

    case createTodo:
      var idsArray = [];
      for (var objKey in newTasksObj) {
        if (!newTasksObj.hasOwnProperty(objKey)) continue;
        idsArray.push(parseInt(objKey, 10));
      }
      var newId = Math.max.apply(null, idsArray) + 1;
      newTasksObj[newId] = {
        "id" : newId,
        "isCompleted" : false,
        "isEditable" : false,
        "name" : action.payload.name
      }
      newObj.tasks = newTasksObj;
      return newObj;

    default:
      return state;
  }
};
