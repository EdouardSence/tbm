import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import NouveauTbmData from '../assets/json/NouveauTbm.json';

function SearchBarBus() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const filteredResults = NouveauTbmData.filter((item) =>
      item.libelle.toLowerCase().includes(newSearchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  }

  function handleResultClick(result) {
    navigate(`/tbm/viewBus?numero=${result.numero}&ligne=${result.transport?.BUS?.[0]?.lineId}`);
  }

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />

        <div className="listBus">
          {searchResults.map((result) => (
            <div key={result.numero}>
              <Link
                to={`/tbm/viewBus?ligne=${result.transport?.BUS?.[0]?.lineId}&numero=${result.numero}`}
                style={{ color: "white" }}
                onClick={() => handleResultClick(result)}
              >
                {result.transport?.["BUS"]?.[0]?.image && (
                  <img
                    src={`/${result.transport["BUS"][0].image}`}
                    alt="logo"
                    style={{ width: 50, height: 50, verticalAlign: "middle", padding: 10 }}
                  />
                )}
                {result.transport?.BUS?.[0]?.destination_name && (
                  <>
                    {result.libelle} - {result.transport["BUS"][0].destination_name}
                  </>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchBarBus;
