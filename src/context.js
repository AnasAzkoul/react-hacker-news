import React, { useContext, useEffect, useReducer } from 'react';

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';
import reducer from './reducer';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const initialState = {
  isLoading: true, 
  hits: [], 
  query: 'react', 
  page: 0,
  nbPages: 0
};

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState); 
  const {query, page, nbPages, hits} = state
  
  const fetchStories = async (url) => {
    dispatch({type: SET_LOADING}); 
    try {
      const response = await fetch(url); 
      const data = await response.json(); 
      // console.log(data); 
      
      dispatch({
        type: SET_STORIES,
        payload: {
          hits: data.hits,
          nbPages: data.nbPages
        }
      }); 
    } catch (error) {
      console.log(error); 
    }
  }
  
  const removeStory = (id) => {
    const newStories = hits.filter((story) => story.objectID !== id);
    dispatch({ type: REMOVE_STORY, payload: newStories });
  };
  
  const handleSearch = (searchQuery) => {
    dispatch({type: HANDLE_SEARCH, payload: searchQuery})
  }; 
  
  const handlePage = (value) => {
    console.log(value); 
    if (value === 'inc') {
      if (page < nbPages - 1) {
        dispatch({type: HANDLE_PAGE, payload: page + 1})
        return 
      } else {
        dispatch({type: HANDLE_PAGE, payload: 0})
        return 
      }
    } 
    
    if (value === 'dec') {
      if (page > 0) {
        dispatch({type: HANDLE_PAGE, payload: page - 1})
        return; 
      } else {
        dispatch({type: HANDLE_PAGE, payload: nbPages - 1});
        return; 
      }
    }
  }
  
  
  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${query}&page=${page}`)
  
  }, [query, page]); 
  
  const value = {
    ...state,
    removeStory,
    handleSearch,
    handlePage, 
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider } 
