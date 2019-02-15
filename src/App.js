import React, { Component } from 'react';
import './App.css';
import TopMenu from "./TopMenu/component";

import { withTranslation } from "react-i18next";
import theme from "./Theme";
import { MuiThemeProvider } from '@material-ui/core/styles';

class App extends Component {

  render() {
      const { t } = this.props;

      return (
          <MuiThemeProvider theme={theme}>
              <TopMenu/>
              <h2>{t('Welcome to React')}</h2>
          </MuiThemeProvider>
      );
  }
}

export default withTranslation()(App);
