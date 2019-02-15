import React, { Component } from 'react';
import './App.css';

import { withTranslation } from "react-i18next";

class App extends Component {

  render() {
      const { t } = this.props;

      return (
          <div className="App">
              <h2>{t('Welcome to React')}</h2>
          </div>
      );
  }
}

export default withTranslation()(App);
