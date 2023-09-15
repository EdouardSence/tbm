// import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import '../assets/Css/App.css'
import  { useState } from 'react';
import data from '../assets/json/NouveauTbm.json'; // Assurez-vous d'utiliser le chemin correct

function SearchBarBus() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredResults = data.filter((busStop) => {
      if (busStop.transport && busStop.transport.BUS) {
        return busStop.libelle.toLowerCase().includes(searchTerm);
      }
      return false; // Retourne false si l'arrêt de bus n'a pas d'attribut "BUS"
    });

    setSearchResults(filteredResults);
  };

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button type="submit">Search</button>
      </div>
      <div className="listBus">
        {searchResults.map((busStop) => (
          <div key={busStop.numero}>
            <p>
              {busStop.transport && busStop.transport.BUS ? (
                `Ligne ${busStop.transport.BUS[0].lineId}, destination: ${busStop.transport.BUS[0].destination_name}`
              ) : (
                'Aucune information sur les lignes de bus disponible.'
              )}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchBarBus;

