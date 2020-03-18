import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

import theme from "./theme";

import { MuiThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { BottomMenu } from "./bottom-menu";
import { TopMenu } from "./top-menu";
import { Library } from "./library";
import { Properties } from "./properties";
import { NewProjectDialog } from "./new-project-dialog";
import { NewFileDialog } from "./new-file-dialog";
import { ExportProjectDialog } from "./export-project-dialog";
import { RenameFileDialog } from "./rename-file-dialog";
import { WorkingArea } from "./working-area";
import { loadStatic } from "./loader";
import initStore from "./store";

import "./app.scss";

const App = () => {
    const [store, setStore] = useState(null);

    useEffect(() => {
        loadStatic().then(() => setStore(initStore()));
    }, []);

    return store ? (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <div className="app-root">
                    <NewProjectDialog/>
                    <NewFileDialog/>
                    <ExportProjectDialog/>
                    <RenameFileDialog/>
                    <div className="app-grid">
                        <Grid container className="app-full-height">
                            <Grid item lg={10} md={9} sm={8} className="app-left-column">
                                <div className="app-working-area">
                                    <WorkingArea/>
                                </div>
                                <div className="app-bottom-menu">
                                    <BottomMenu/>
                                </div>
                            </Grid>
                            <Grid item lg={2} md={3} sm={4} className="app-right-column">
                                <Properties/>
                                <Library/>
                            </Grid>
                        </Grid>
                    </div>
                    <TopMenu/>
                </div>
            </MuiThemeProvider>
        </Provider>
    ) : (
        <div className="loader">
            <div className="loader-ring">
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    );
};

export default App;
