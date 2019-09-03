import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./app";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import ProjectData from "./project-data/project-data";

import "./locale";
import "./index.scss";

ProjectData.init();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();

