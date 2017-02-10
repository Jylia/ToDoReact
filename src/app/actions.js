import { markTodoAsDone } from './constants';

export function markTaskAsDone(taskId) {
  return {
    type: markTodoAsDone,
    payload: taskId
  }
}
