import { 
  markTodoAsDone,
  deleteTodo,
  createTodo,
  filterTodos,
  setData,
  setItem
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

export function setItemToStore(entity) {
  return {
    type: setItem,
    payload: entity
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

export function updateTask(taskId, taskObj, options) {
  let fetchUrl = `api/v1/tasks/${taskId}`;
  if (options && options.shoudBeEditable) {
    fetchUrl = `api/v1/tasks/${taskId}/setIsEditable`;
  }
  return (dispatch) => {
      return fetch(fetchUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskObj),
      method: 'PUT'
    }).then(checkStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(setItemToStore(response));
      });
  }
}

export function markAllTasksAsDone(isAllMarkedAsDone) {
  return (dispatch) => {
      isAllMarkedAsDone = !isAllMarkedAsDone;
      return fetch(`api/v1/tasks/toggleAll/${isAllMarkedAsDone}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    }).then(checkStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(setDataToStore(response));
      });
  }
}
