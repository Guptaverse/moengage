import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './containers/LoginSingup/LoginSignup';
import Homepage from './containers/Homepage/Homepage';
import DetailsPage from './containers/DetailsPage/DetailsPage';

const App = () => {
  return (
    <div className='App'>
    <h1 style={{color:"white",textAlign:"center",backgroundColor:"orange",padding:"5px",borderRadius:"5px"}}>Brewery Search App</h1>
    <Router>
      <Routes>
        <Route path = "/" element={<LoginSignup/>} />
        <Route path = "/home" element={<Homepage/>} />
        <Route path="/details/:id" element={<DetailsPage/>} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
