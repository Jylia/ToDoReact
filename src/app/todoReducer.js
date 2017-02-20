import { 
  markTodoAsDone,
  deleteTodo,
  setIsEditableTodo,
  editTodo,
  markAllAsDone,
  createTodo,
  setData
} from './constants';

const initialState = {
  tasks: {},
  isLoading: true,
  isAllMarkedAsDone: false
};

// console.log(window.location);

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

    case setData:
      action.payload.entities.forEach((item) => {
        newTasksObj[item.id] = item;
      });

      newObj.tasks = newTasksObj;
      newObj.isLoading = false;
      return newObj;

    default:
      return state;
  }
};
