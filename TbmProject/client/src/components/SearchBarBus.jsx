import { useState } from 'react';
import { Link } from 'react-router-dom';
import NouveauTbmData from '../assets/json/NouveauTbm.json';
import PropTypes from 'prop-types';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

// Définissez la fonction handleInputChange en dehors de SearchBarBus
function handleInputChange(newSearchTerm, setSearchTerm, setSearchResults) {
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

function SearchBarBus(props) {
  const { viewbus, profile } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [busAlreadyInFavorites, setBusAlreadyInFavorites] = useState(false);

  async function handleAddToFavorites(result) {
    if (!props.profile) {
      return;
    }

    try {
      // Regardez si le bus est déjà dans les favoris
      const response = await axios.get(`/api/favori/getbusfavori?nom=${props.profile}`);
      const favoris = response.data;
      if (favoris && Array.isArray(favoris.bus) && favoris.bus.some((bus) => bus.numero === result.numero)) {
        setBusAlreadyInFavorites(true);
        return;
      }
      
      await axios.post(`/api/addbusfavori`, { nom: props.profile, busInfo : result });
      setBusAlreadyInFavorites(false);

      console.log('Bus ajouté aux favoris :', result);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du bus aux favoris', error);
    }
  }

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => handleInputChange(event.target.value, setSearchTerm, setSearchResults)} // Utilisez la fonction handleInputChange définie en dehors de SearchBarBus
        />
        {busAlreadyInFavorites && <p style={{ color: 'red' }}>Ce bus est déjà en favori</p>}
        <div className="listBus">
          {searchResults.map((result) => (
            <div key={result.numero}>
              {result.transport?.BUS?.length > 0 && (
                <>
                  {viewbus ? (
                    <Link
                      to={`viewBus?numero=${result.numero}&ligne=${result.transport?.BUS?.[0]?.lineId}`}
                      style={{ color: "white" }}
                    >
                      {result.transport?.["BUS"]?.[0]?.image && (
                        <img
                          src={`../${result.transport["BUS"][0].image}`}
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
                  ) : (
                    <div>
                      {result.transport?.["BUS"]?.[0]?.image && (
                        <img
                          src={`../${result.transport["BUS"][0].image}`}
                          alt="logo"
                          style={{ width: 50, height: 50, verticalAlign: "middle", padding: 10 }}
                        />
                      )}

                      {result.libelle} -{" "}
                      {result.transport?.BUS
                        ?.map((destination) => destination.destination_name)
                        .filter((destination, index, self) => self.indexOf(destination) === index)
                        .join(", ")}
                      {profile && (
                        <button onClick={() => handleAddToFavorites(result)}>add</button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

SearchBarBus.propTypes = {
  viewbus: PropTypes.bool,
  profile: PropTypes.string,
};

export default SearchBarBus;
