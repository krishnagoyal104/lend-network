const initialState = {'eth': 0, 'dai': 0, 'allowance': 0};

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_BALANCE':
      return {...state, ...action.balance};         
    default:
      return state;  
  };
}
