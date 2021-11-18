import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from "./Header";
//import history from "../history";

const App =  (props) => {
  return (
    <div>
      <div className="container">         
        <Header/>     
        <Outlet />
      </div>      
    </div>
  )
};

export default App;

