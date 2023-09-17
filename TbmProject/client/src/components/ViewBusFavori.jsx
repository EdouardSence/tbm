import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SearchBarBus from './SearchBarBus';
import ListeBusFavori from './ListeBusFavori';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000'; // Remplacez par l'URL de votre backend

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

  const supprimerProfil = async () => {
    try {
      // Utilisez une requête POST pour supprimer le profil
      await axios.post(`/api/supprimer-profil`, { nom: profile });
      window.location.href = "/tbm/favori";
    } catch (error) {
      console.error('Erreur lors de la suppression du profil', error);
    }
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

        <button onClick={supprimerProfil}>Supprimer le profil</button>
        <br />

      <Link to="/tbm/favori">Retour</Link>
    </>
  );
}

export default ViewBusFavori;

