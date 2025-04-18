export const initialStore = () => {
  return {
    token: null,


  }
};

export default function storeReducer(store, action = {}) {
  if (action.type == "updateToken") {
    console.log("Updating token in global state:", action.payload);
    
    return {
      ...store,
      token: action.payload,
    };
  }  
  return store; // Return the current state for unknown actions
}
