import React, { Component } from "react";
import "./App.css";
import ConTopMenu from "./top-menu/container";

import theme from "./Theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import WorkingArea from "./working-area/component";
import uiConst from "./constant/uiConst";
import BottomMenu from "./bottom-menu/component";
import Panel from "./common-ui/titled-panel/titled-panel";
import ConLibrary from "./library/container";
import NewProjectDialog from "./new-project-dialog/container";
import ExportProjectDialog from "./export-project-dialog/container";

const styles = theme => ({
    root: {
        height: "100%"
    },
    grid: {
        flexGrow: 1,
        height: "calc(100% - " + uiConst.TOP_MENU_HEIGHT + "px)"
    },
    fullHeight: {
        height: "100%"
    },
    leftColumn: {
        height: "100%",
        display: "inline-block"
    },
    rightColumn: {
        height: "100%",
        display: "inline-block"
    },
    workingArea: {
        width: "100%",
        height: "75%"
    },
    bottomMenu: {
        width: "100%",
        height: "25%"
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        color: theme.palette.text.secondary,
    }
});

class App extends Component {

  render() {
      const { classes } = this.props;

      return (
          <MuiThemeProvider theme={theme}>
              <div className={classes.root}>
                  <NewProjectDialog/>
                  <ExportProjectDialog/>
                  <ConTopMenu/>
                  <div className={classes.grid}>
                      <Grid container className={classes.fullHeight}>
                          <Grid item xs={10} className={classes.leftColumn}>
                              <div className={classes.workingArea}>
                                  <WorkingArea/>
                              </div>
                              <div className={classes.bottomMenu}>
                                  <BottomMenu/>
                              </div>
                          </Grid>
                          <Grid item xs={2} className={classes.rightColumn}>
                              <Panel title={"Properties"}>
                                  Test
                              </Panel>
                              <ConLibrary/>
                          </Grid>
                      </Grid>
                  </div>
              </div>
          </MuiThemeProvider>
      );
  }
}

export default withStyles(styles)(App);
