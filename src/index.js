import React from "react";
import ReactDOM from "react-dom";

import App from "./app";
import * as serviceWorker from "./serviceWorker";
import ProjectData from "./project-data/project-data";

import "./index.scss";

ProjectData.init();

ReactDOM.render(<App/>, document.getElementById("root"));

serviceWorker.unregister();

