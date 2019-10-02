const initialState = {'requests': [], 'offers': []};

export default(state = initialState, {type, requests, offers}) => {
  switch (type) {
    case 'SET_REQUESTS':
      return {
      	requests: [...state.requests, ...requests],
      	offers: [...state.offers, ...offers]
      }         
    default:
      return state;  
  };
}
