import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Localisation from "./data/Localisation.json";
import topMenuReducer from "./TopMenu/reducer";
import newProjectDialogReducer from "./NewProjectDialog/reducer";

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';

i18n.use(initReactI18next).init(Localisation);

const store = createStore(combineReducers({
    topMenu: topMenuReducer,
    newProjectDialog: newProjectDialogReducer
}));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
