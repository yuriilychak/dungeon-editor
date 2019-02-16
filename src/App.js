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
import BottomMenu from "./BottomMenu/component";
import RightMenu from "./RightMenu/component";

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
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
});

class App extends Component {

  render() {
      const { classes } = this.props;
      const { t } = this.props;
      //<h2>{t('Welcome to React')}</h2>
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
                                  <BottomMenu/>
                              </div>
                          </Grid>
                          <Grid item xs={2} className={classes.rightColumn}>
                              <RightMenu/>

                          </Grid>
                      </Grid>
                  </div>
              </div>
          </MuiThemeProvider>
      );
  }
}

export default withTranslation()(withStyles(styles)(App));
