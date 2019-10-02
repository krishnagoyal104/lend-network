const initialState = null;

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_TICKER':
      return action.ticker;         
    default:
      return state;  
  };
}
