import React, {useEffect} from 'react';

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const useFetch = (state, dispatch, ENDPOINT) => {
  const { query, page, nbPages, hits } = state;

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);

      dispatch({
        type: SET_STORIES,
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });

      dispatch({ type: SET_LOADING, payload: false });
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
      fetchStories(`${ENDPOINT}query=${query}&page=${page}`);
    }, [query, page]);
  
  return {...state}; 
}

export default useFetch
