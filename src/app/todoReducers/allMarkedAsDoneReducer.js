import { 
  markTodoAsDone
} from '../constants';

const initialallMarkedAsDoneState = {
  isAllMarkedAsDone: false
}

export default function allmarkedAsDone(state = initialallMarkedAsDoneState, action) {
  var newObj = Object.assign({}, state);
  switch (action.type) {
    case markTodoAsDone:
      newObj.isAllMarkedAsDone = !newObj.isAllMarkedAsDone;
      return newObj;
  default:
    return state;
  }
}
