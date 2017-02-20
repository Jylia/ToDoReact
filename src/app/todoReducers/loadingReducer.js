import { 
  setData
} from '../constants';

const initialLoadingState = {
  isLoading: true
}

export default function loading(state = initialLoadingState, action) {
  switch (action.type) {
    case setData:
      return {
        isLoading: false
      }
    default:
      return state;
  }
}
