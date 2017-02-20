import { 
  markTodoAsDone,
  deleteTodo,
  setIsEditableTodo,
  editTodo,
  markAllAsDone,
  createTodo,
  filterTodos,
  setData
} from './constants';

export function markTaskAsDone(taskId) {
  return {
    type: markTodoAsDone,
    payload: taskId
  }
}

export function deleteTask(taskId) {
  return {
    type: deleteTodo,
    payload: taskId
  }
}

export function setIsEditableTask(taskId) {
  return {
    type: setIsEditableTodo,
    payload: taskId
  }
}

export function editTask(taskId, name) {
  return {
    type: editTodo,
    payload: {
      taskId,
      name
    }
  }
}

export function markAllTasksAsDone() {
  return {
    type: markAllAsDone
  }
}

export function createTask(name) {
  return {
    type: createTodo,
    payload: {
      name
    }
  }
}

export function filterTasks(filterType) {
  return {
    type: filterTodos,
    payload: {
      filterType
    }
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export function setDataToStore(entities) {
  return {
    type: setData,
    payload: {
      entities
    }
  }
}

export function fetchTodos() {
  return (dispatch) => {
    return fetch(`api/v1/tasks.json`, {
        accept: 'application/json',
      }).then(checkStatus)
        .then(parseJSON)
        .then((response) => {
          dispatch(setDataToStore(response));
        });
  }
}
