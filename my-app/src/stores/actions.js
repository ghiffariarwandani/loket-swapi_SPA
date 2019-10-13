import ax from '../services/api'
let page = 1
let pagePlanet = 1

export const fetchPeople = () => {
  return dispatch => {
    dispatch({ type: 'SET_IS_LOADING', payload: true })
    ax.get(`/people/?page=${page}`)
      .then(({data}) => {
        dispatch({ type: 'SET_IS_LOADING',  payload: false })
        dispatch(receiveFetchPeople(data))
        page++
      })
      .catch(err => {
        dispatch({ type: 'SET_IS_LOADING', payload: false })
        console.log(err);
        dispatch({ type: 'SET_IS_ERROR', payload: err })
      })
  }
}

export const receiveFetchPeople = (payload) => {
  return {
    type: 'RECEIVE_FETCH_PEOPLE',
    payload
  }
}

export const fetchStarships = () => {
  return dispatch => {
    ax.get(`/planets/?page=${pagePlanet}`)
      .then(({data}) => {
        dispatch(receiveFetchStarships(data.results))
        dispatch({ type: 'RECEIVE_MAX_PLANETS', payload: data.count })
        pagePlanet++
        if (data.next != null) dispatch(fetchStarships())
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export const receiveFetchStarships = (payload) => {
  let isUniverse = payload.map((el, i) => {
    return {
      key: el.name,
      text: el.name,
      value: el.name,
      url: el.url
    }
  })
  
  return {
    type: 'RECEIVE_FETCH_STARSHIPS',
    payload: isUniverse
  }
}

export const fetchOnePeople = (id) => {
  return dispatch => {
    dispatch({ type: 'SET_IS_LOADING', payload: true })
    ax.get(`/people/${id}/`)
      .then(({data}) => {
        dispatch(receiveFetchOnePeople(data))
      })
      .catch(err => {
        console.log(err);
      }) 
  }
}

export const receiveFetchOnePeople = (payload) => {
  return {
    type: 'RECEIVE_FETCH_ONE_PEOPLE',
    payload
  }
}