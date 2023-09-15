import React from 'react'
import ReactDOM from 'react-dom/client'
import SearchBarBus from './components/SearchBarBus'
import TbHESS from './components/TbHESS'
import './assets/Css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TbHESS />
    <SearchBarBus />
  </React.StrictMode>,
)
 