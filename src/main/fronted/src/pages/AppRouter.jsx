import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./home";
import Login from "./login";


function AppRouter() {
    return (
        <Router>
                <Routes>
                   <Route path="/home" element={<Home />} />;
                    <Route path="/" element={<Login />} />;
                </Routes>
        </Router>
    );
}

export default AppRouter;
