import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const reducer = (state, action) => {
  const {type, payload} = action; 
  
  switch (type) {
    case SET_LOADING: 
      return {
        ...state,
        isLoading: true 
      }
    
    case SET_STORIES: 
      return {
        ...state, 
        hits: payload.hits, 
        nbPages: payload.nbPages, 
        isLoading: false
      }
    
    case REMOVE_STORY: 
      return {
        ...state, 
        hits: payload
      }
    
    case HANDLE_SEARCH: 
      return {
        ...state, 
        query: payload, 
        page: 0
      }
    
    case HANDLE_PAGE: 
      return {
        ...state, 
        page: payload
      }
    
    default:
      throw new Error(`No matching action type for ${type}`);
  }
};


export default reducer;
