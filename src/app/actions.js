import { 
  markTodoAsDone,
  deleteTodo,
  setIsEditableTodo,
  setIsNotEditableTodo
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

export function setIsNotEditableTask(taskId, name) {
  return {
    type: setIsNotEditableTodo,
    payload: {
      taskId,
      name
    }
  }
}
