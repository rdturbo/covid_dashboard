import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers/reducers";
import thunk from "redux-thunk";

export default function configureStore() {
    const composeEnhancers = (window && (window as any)).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose || compose;
    return createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
}
