import { useState } from 'react';
import { Link } from 'react-router-dom';
import NouveauTbmData from '../assets/json/NouveauTbm.json';
import PropTypes from 'prop-types'; // Importez PropTypes depuis la bibliothèque prop-types
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000'; // Remplacez par l'URL de votre backend

function SearchBarBus(props) {
  const { viewbus, profile } = props;
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

  async function handleAddToFavorites(result) {
    if (!props.profile) {
      return; // Ne faites rien si le profil n'est pas défini
    }

    try {
      // Envoi de la requête POST pour ajouter le bus au profil favori
      await axios.post('/api/addbusfavori', {
        nom: props.profile,
        busInfo: {
          numero: result.numero,
          libelle: result.libelle,
          vehicule: "BUS",
          transport: {
            BUS: [
              {
                destination_name: result.transport?.BUS?.[0]?.destination_name || '',
                lineId: result.transport?.BUS?.[0]?.lineId || '',
                image: result.transport?.BUS?.[0]?.image || '',
              },
            ],
          },
        },
      });

      // Effectuez ici des actions supplémentaires si nécessaire, comme mettre à jour l'interface utilisateur

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
          onChange={handleInputChange}
        />

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
  viewbus: PropTypes.bool, // Validez que viewbus est de type booléen
  profile: PropTypes.string, // Validez que profile est de type booléen
};

export default SearchBarBus;
