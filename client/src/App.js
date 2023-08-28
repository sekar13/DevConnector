import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './componenets/layout/Navbar';
import Landing from './componenets/layout/Landing';
import Login from './componenets/auth/Login';
import Register from './componenets/auth/Register';

import './App.css';

const App = () => 
    <Router>
      <Fragment>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="register" element={<Register/>} />
          <Route path="login" element={<Login/>}/>
         
          
          
        </Routes>
        
        
      </Fragment>
    </Router>


export default App;
