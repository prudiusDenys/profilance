import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import { Home } from './UI/components/Home/Home';
import {MainLayout} from "./UI/common/MainLayout/MainLayout";
import {News} from "./UI/components/News/News";

export const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <MainLayout>
        <Route exact path={'/'} render={()=> <Home/>}/>
        <Route exact path={'/news'} render={()=> <News/>}/>
      </MainLayout>
    </div>
    </BrowserRouter>
  );
}
