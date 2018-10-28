import { createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './modules/reducer';
export default function configureStore(history, client, data) {
    const reduxRouterMiddleware = routerMiddleware(history);
    const middleware = [createMiddleware(client), reduxRouterMiddleware];
    return createStore(
            rootReducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
            applyMiddleware(...middleware),
            data
    );
}
