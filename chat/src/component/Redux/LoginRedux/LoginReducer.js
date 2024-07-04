const initialState = {
    token: JSON.parse(localStorage.getItem('UserToken')) || null,
  };
const LoginReducer=(state=initialState,action)=>{
    switch(action.type){
        case "Token" :
            return {...state, token: action.payload};
        default:return state;
    }
}

export default  LoginReducer