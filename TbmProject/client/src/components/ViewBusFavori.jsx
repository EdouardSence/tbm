import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SearchBarBus from './SearchBarBus';
import ListeBusFavori from './ListeBusFavori';

function ViewBusFavori() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const profile = params.get("profile");
  
  // État local pour gérer l'affichage de la barre de recherche
  const [showSearchBar, setShowSearchBar] = useState(true);

  // État local pour gérer le texte du bouton
  const [buttonText, setButtonText] = useState("Voir les bus favoris");

  // Fonction pour basculer entre la recherche et les bus favoris
  const toggleView = () => {
    setShowSearchBar(!showSearchBar);
    setButtonText(showSearchBar ? "Ajouter un bus" : "Voir les bus favoris");
  };

  return (
    <>
      <div>
        <h3>Wsh {profile}</h3>
        <button onClick={toggleView}>{buttonText}</button>
      </div>

      {/* Afficher la barre de recherche si showSearchBar est vrai */}
      {showSearchBar && <SearchBarBus profile={profile} />}

      {/* Afficher la liste des bus favoris si showSearchBar est faux */}
      {!showSearchBar && <ListeBusFavori profile={profile} />}

      <Link to="/tbm/favori">Retour</Link>
    </>
  );
}

export default ViewBusFavori;

