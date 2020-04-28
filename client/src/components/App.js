import React, { useReducer } from "react";

import 'babel-polyfill';

import styles from './App.css'
//route
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ContextProvider from './store/context/contextProvider'

//pages
import Home from './pages/Home'

const App = () => {

  return (
    <div>
        <ContextProvider>
          <BrowserRouter>
            <Switch>
                <Route path="/" component={ Home }/>
                <Route component={ Home }/>
            </Switch>
          </BrowserRouter>
        </ContextProvider>
    </div>
  );
};

export default App; 
