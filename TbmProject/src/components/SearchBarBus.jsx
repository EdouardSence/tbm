// import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import '../assets/Css/App.css'
import '../assets/json/NouveauTbm.json'

 
function SearchBarBus() {
  return (
    <>
        <div className="searchBar">
            <input type="text" placeholder="Search" />
            <button type="submit">Search</button>
        </div>
        <div className="listBus">
        </div>
    </>
  )
}

export default SearchBarBus
