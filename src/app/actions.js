import { 
  markTodoAsDone,
  deleteTodo,
  setIsEditableTodo,
  editTodo,
  markAllAsDone,
  createTodo,
  filterTodos
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

