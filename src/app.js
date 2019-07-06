import React, { Component } from "react";
import theme from "./Theme";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import uiConst from "./constant/uiConst";
import BottomMenu from "./bottom-menu/component/bottom-menu";

import { TopMenu } from "./top-menu";
import { Library } from "./library";
import { Properties } from "./properties";
import { NewProjectDialog } from "./new-project-dialog";
import { ExportProjectDialog } from "./export-project-dialog";
import { RenameFileDialog } from "./rename-file-dialog";
import { WorkingArea } from "./working-area";

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
                  <RenameFileDialog/>
                  <TopMenu/>
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
                              <Properties/>
                              <Library/>
                          </Grid>
                      </Grid>
                  </div>
              </div>
          </MuiThemeProvider>
      );
  }
}

export default withStyles(styles)(App);
