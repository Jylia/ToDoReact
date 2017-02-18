import { 
  filterTodos
} from './constants';

const initialState = 'ALL';

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case filterTodos:
      switch (action.payload.filterType) {
        case 'ALL':
          return 'ALL';
        case 'COMPLETED':
          return 'COMPLETED';
        case 'UNCOMPLETED':
          return 'UNCOMPLETED';
        default:
          return 'ALL';
      }
    default: 
      return state;
  }
};
