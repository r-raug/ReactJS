import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FormPageGet from './pages/FormPageGet';
import FormPagePost from './pages/FormPagePost';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get" element={<FormPageGet />} />
          <Route path="/post" element={<FormPagePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
