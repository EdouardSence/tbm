import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import ListeUser from './components/Favori/ListeUser';
import ProfileInfo from './components/Favori/profileInfo';
import BusScreen from './components/voirBus/busScreen.jsx';
import Secret from './components/Secret/Secret';
import './assets/Css/index.css';
import './assets/Css/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h1> TbHESS </h1>
    <Router>
      <Routes>
        <Route exact path="/tbm/" element={<Menu />} />
        <Route path="/tbm/profile/:profile" element={<ProfileInfo />} />
        <Route path="/tbm/profiles/" element={<ListeUser />} />
        <Route path="/tbm/voir-horaires/" element={<BusScreen />} />
      </Routes>
    </Router>
    <Secret />
    <p>V1.1</p>
  </React.StrictMode>
);