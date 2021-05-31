import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from 'src/components/App';


const rootReactElement = (

  <CookiesProvider>
    <Router>

      <App />

    </Router>
  </CookiesProvider>

);

const target = document.getElementById('root');
ReactDom.render(rootReactElement, target);
