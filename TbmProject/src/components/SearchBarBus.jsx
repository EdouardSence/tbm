// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react';
import '../assets/Css/App.css'
import NouveauTbmData from '../assets/json/NouveauTbm.json';


function SearchBarBus() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  }
  function handleSearch() {
    const filteredResults = NouveauTbmData.filter((item) =>
      item.libelle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }


  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}  // Value is associated with the searchTerm state
          onChange={handleInputChange} // onChange handler updates searchTerm
        />

        <button type="submit" onClick={handleSearch}>Search</button>

        <div className="listBus">
          {searchResults.map((result) => (
            <div key={result.numero}>

              <a href='#' style={{ color: "white" }}>
                {result.transport?.["BUS"]?.[0]?.image && (
                  <img
                    src={`/${result.transport["BUS"][0].image}`}
                    alt="logo"
                    style={{ width: 50, height: 50, verticalAlign: "middle", padding: 10 }}
                  />)}
                {result.transport?.BUS?.[0]?.destination_name && (
                  <>
                    {result.libelle} - {result.transport["BUS"][0].destination_name}</>
                )}
              </a>
              {/* Display other relevant information */}
            </div>
          ))}
        </div>
      </div>

    </>
  );
}









export default SearchBarBus;
