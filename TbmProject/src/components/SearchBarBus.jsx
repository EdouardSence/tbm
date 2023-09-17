import { useState } from 'react';
import { Link } from 'react-router-dom';

import NouveauTbmData from '../assets/json/NouveauTbm.json';

function SearchBarBus() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function handleInputChange(event) {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm.length < 1) {
      setSearchResults([]);
      return;
    }

    // Split the input by space
    const searchTerms = newSearchTerm.split(' ');

    const filteredResults = NouveauTbmData.filter((item) => {
      // Check if any of the search terms match libelle or lineId
      return searchTerms.every((term) => {
        term = term.toLowerCase();
        return (
          item.libelle.toLowerCase().includes(term) ||
          (item.transport?.BUS?.some(
            (destination) =>
              destination.lineId.toString() === term 
          ) ?? false)
        );
      });
    }).slice(0, 10);

    setSearchResults(filteredResults);
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
              {result.transport?.BUS?.length > 0 && (
                <Link
                  to={`viewBus?numero=${result.numero}&ligne=${result.transport?.BUS?.[0]?.lineId}`}
                  style={{ color: "white" }}
                >
                  {result.transport?.["BUS"]?.[0]?.image && (
                    <img
                      src={`./${result.transport["BUS"][0].image}`}
                      alt="logo"
                      style={{ width: 50, height: 50, verticalAlign: "middle", padding: 10 }}
                    />
                  )}

                  {result.libelle} -{" "}
                  {result.transport?.BUS
                    ?.map((destination) => destination.destination_name)
                    .filter((destination, index, self) => self.indexOf(destination) === index)
                    .join(", ")}

                </Link>
              )}


            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchBarBus;
