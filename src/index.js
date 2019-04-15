import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import topMenuReducer from "./TopMenu/reducer";
import newProjectDialogReducer from "./NewProjectDialog/reducer";
import exportProjectDialogReducer from "./ExportProjectDialog/reducer";

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import "./Locale";

const store = createStore(combineReducers({
    topMenu: topMenuReducer,
    exportProjectDialog: exportProjectDialogReducer,
    newProjectDialog: newProjectDialogReducer
}));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
