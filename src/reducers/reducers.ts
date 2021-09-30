import initialState from "./initialState";
import coronaReducer from "./coronaReducer";

function combineReducers(reducers: any) {
  // First get an array with all the keys of the reducers (the reducer names)
  const reducerKeys = Object.keys(reducers);

  return function combination(state: any, action: any) {
    // This is the object we are going to return.
    let newState = state || initialState;

    // Loop through all the reducer keys
    for (let i = 0; i < reducerKeys.length; i++) {
      // Get the current key name
      const key = reducerKeys[i];
      // Get the current reducer
      const reducer = reducers[key];
      // Get the next state by running the reducer
      const newReducerState = reducer(newState, action);
      // Update the state with the current reducer
      newState = {
        ...newState,
        ...newReducerState,
      };
    }
    delete newState["type"];
    return newState;
  };
}

const reducers = combineReducers({ coronaReducer });

export default reducers;
