import React, { useState } from "react";

import theme from "./theme";

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
import {Loader} from "./common-ui";
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
    ) : (
        <Loader className="loader" size={80} isLoading={!localeFetched} />
    )
};

export default App;
