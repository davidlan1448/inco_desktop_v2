import React from 'react';
import { render } from 'react-dom';
import App from './App';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./redux/reducers/index";
import { ToastProvider } from 'react-toast-notifications';
const composeEnhancers = /* window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||  */compose;

const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(reduxThunk))
);

render(
    <Provider store={store}>
      <ToastProvider 
        autoDismiss
        autoDismissTimeout={6000}
        placement="bottom-right"
      >
        <App />
      </ToastProvider>
    </Provider>, 
    document.getElementById('app')
);
