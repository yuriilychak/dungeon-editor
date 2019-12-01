import React, { useState } from "react";

import theme from "./theme";

import CircularProgress from '@material-ui/core/CircularProgress';
import {MuiThemeProvider} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import {BottomMenu} from "./bottom-menu";
import {TopMenu} from "./top-menu";
import {Library} from "./library";
import {Properties} from "./properties";
import {NewProjectDialog} from "./new-project-dialog";
import {NewFileDialog} from "./new-file-dialog";
import {ExportProjectDialog} from "./export-project-dialog";
import {RenameFileDialog} from "./rename-file-dialog";
import {WorkingArea} from "./working-area";
import fetchLocale from "./locale";

import "./app.scss";

const App = () => {
    const [localeFetched, setLocaleFetched] = useState(false);

    fetchLocale().then(() => setLocaleFetched(true));


    return localeFetched ? (
    <MuiThemeProvider theme={theme}>
        <div className="app-root">
            <NewProjectDialog/>
            <NewFileDialog/>
            <ExportProjectDialog/>
            <RenameFileDialog/>
            <TopMenu/>
            <div className="app-grid">
                <Grid container className="app-full-height">
                    <Grid item xs={10} className="app-left-column">
                        <div className="app-working-area">
                            <WorkingArea/>
                        </div>
                        <div className="app-bottom-menu">
                            <BottomMenu/>
                        </div>
                    </Grid>
                    <Grid item xs={2} className="app-right-column">
                        <Properties/>
                        <Library/>
                    </Grid>
                </Grid>
            </div>
        </div>
    </MuiThemeProvider>
    ) : (
        <div
            className="loader"
        >
        <CircularProgress size={80} />
    </div>
    )
};

export default App;
