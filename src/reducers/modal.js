const initialState = {
	isOpen: false,
	path: ''
};

export default(state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
      	isOpen: true,
      	path: action.path
      };
    case 'CLOSE_MODAL':
    	return {
    		isOpen: false,
    		path: ''
    	};           
    default:
      return state;  
  };
}
