import React, { Component } from 'react';
import './App.css';
import TopMenu from "./TopMenu/component";

import { withTranslation } from "react-i18next";
import theme from "./Theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WorkingArea from "./WorkingArea/component";
import uiConst from "./const/uiConst";

const styles = theme => ({
    root: {
        height: "100%"
    },
    grid: {
        flexGrow: 1,
        height: "calc(100% - " + uiConst.TOP_MENU_SIZE + "px)"
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
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
});

class App extends Component {

  render() {
      const { classes } = this.props;
      const { t } = this.props;

      return (
          <MuiThemeProvider theme={theme}>
              <div className={classes.root}>
                  <TopMenu/>
                  <div className={classes.grid}>
                      <Grid container className={classes.fullHeight}>
                          <Grid item xs={10} className={classes.leftColumn}>
                              <div className={classes.workingArea}>
                                  <WorkingArea/>
                              </div>
                              <div className={classes.bottomMenu}>
                                  bottom Panel
                              </div>
                          </Grid>
                          <Grid item xs={2} className={classes.rightColumn}>
                              right panel
                              <h2>{t('Welcome to React')}</h2>
                          </Grid>
                      </Grid>
                  </div>
              </div>
          </MuiThemeProvider>
      );
  }
}

export default withTranslation()(withStyles(styles)(App));
