const initialState = false;

export default(state = initialState, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return true;
    case 'STOP_LOADING':
    	return false;           
    default:
      return state;  
  };
}
