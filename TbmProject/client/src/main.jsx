import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Favori from './components/Favori';
import Menu from './components/Menu';
import TbHESS from './components/TbHESS';
import ViewBus from './components/ViewBus';
import ViewBusFavori from './components/ViewBusFavori';
import './assets/Css/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TbHESS />
    <Router>
      <Routes>
        <Route exact path="/tbm/" element={<Menu />} />
        <Route exact path="/tbm/favori/" element={<Favori />} />
        <Route path="tbm/viewBus/" element={<ViewBus />} />
        <Route path="tbm/favori/viewbus/" element={<ViewBusFavori />} />
      </Routes>
    </Router>
  </React.StrictMode>
);