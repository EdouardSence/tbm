import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBarBus from './components/SearchBarBus';
import TbHESS from './components/TbHESS';
import ViewBus from './components/ViewBus';
import './assets/Css/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TbHESS />
    <Router>
      <Routes>
        <Route exact path="/tbm/" element={<SearchBarBus />} />
        <Route path="tbm/viewBus/" element={<ViewBus />} />
      </Routes>
    </Router>
  </React.StrictMode>
);