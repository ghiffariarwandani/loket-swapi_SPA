const initState = {
  isLoading: false,
  max: 0,
  maxStarships: 0,
  peoples: [],
  starships: [{
    key: 'All People',
    text: 'All People',
    value: 'All People',
    url: 'All People'
  }],
  isError: [],
  isPeople: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'RECEIVE_FETCH_PEOPLE':
      return {
        ...state,
        peoples: [...state.peoples, ...action.payload.results],
        max: action.payload.count
      }
    case 'SET_IS_LOADING': 
      return {
        ...state,
        isLoading: action.payload
      }
    case 'SET_IS_ERROR':
      return {
        ...state,
        isError: action.payload
      }
    case 'RECEIVE_FETCH_STARSHIPS':
      return {
        ...state,
        starships: [...state.starships, ...action.payload]
      }
    case 'RECEIVE_FETCH_ONE_PEOPLE':
      return {
        ...state,
        isPeople: action.payload
      }
    case 'RECEIVE_MAX_PLANETS': 
      return {
        ...state,
        maxStarships: action.payload
      }
      
  
    default:
      return state
  }
}

export default reducer