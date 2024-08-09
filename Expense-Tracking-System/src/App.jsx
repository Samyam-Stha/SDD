// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login.jsx';
import SignUp from './Signin/SignUp.jsx';

function App() {
    return (
      
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Signup" element={<SignUp />} />
            </Routes>
        </Router>
      
    );
}

export default App;
