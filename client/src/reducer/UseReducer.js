const stateVal=JSON.parse(localStorage.getItem("toggleState"));

export const initialState = stateVal || null;

export const reducer = (state,action)=>{
    if(action.type==="USER"){
        return action.payload;
    }
    return state;
} 