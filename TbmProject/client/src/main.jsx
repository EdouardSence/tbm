import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import VoirHoraires from './components/voirBus/voirHoraireBus';
import './assets/Css/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h1> TbHESS </h1>
    <Router>
      <Routes>
        <Route exact path="/tbm/" element={<Menu />} />
        <Route path="/tbm/voir-horaires/" element={<VoirHoraires />} />
      </Routes>
    </Router>
    <p>V1.1</p>
  </React.StrictMode>
);