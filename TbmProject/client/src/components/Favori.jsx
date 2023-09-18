import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Définissez la base URL globale pour Axios ici
axios.defaults.baseURL = 'http://localhost:3000'; // Remplacez par l'URL de votre backend

function Favori() {
  const [newNom, setNewNom] = useState('');
  const [favoris, setFavoris] = useState([]);
  const [erreur, setErreur] = useState(null); // État pour stocker les messages d'erreur

  // Fonction pour charger la liste des favoris depuis le backend
  const chargerFavoris = async () => {
    try {
      const response = await axios.get('/api/favori/listeUser'); // Utilisez la route relative
      setFavoris(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des favoris', error);
    }
  };

  // Charger la liste des favoris au chargement du composant
  useEffect(() => {
    chargerFavoris();
  }, []);

  // Fonction pour ajouter un compte
  const handleAjouterCompte = async () => {
    if (newNom.trim() === '') {
      // Vérifiez si le nom est vide ou uniquement composé d'espaces
      setErreur('Le nom ne peut pas être vide.'); // Définir le message d'erreur
      return;
    }

    if (favoris.find((favori) => favori.nom === newNom)) {
      // Vérifiez si le compte existe déjà
      setErreur('Le compte existe déjà.'); // Définir le message d'erreur
      return;
    }

    try {
      // Envoyez une requête POST au backend pour ajouter un nom
      await axios.post('/api/ajouter-nom', { nom: newNom });

      // Rechargez la liste des favoris depuis le backend
      chargerFavoris();

      // Réinitialisez le champ de saisie et le message d'erreur
      setNewNom('');
      setErreur(null);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du compte', error);
    }
  };

  // Gestionnaire d'événements pour la touche "Entrée" sur l'input
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Appel de la fonction pour ajouter un compte si la touche "Entrée" est pressée
      handleAjouterCompte();
    }
  };

  return (
    <>
      <h3>Liste des profils</h3>
      <div className="Liste Compte">
        {favoris.map((favori, index) => (
          <Link
            key={index}
            to={`/tbm/favori/viewbus?profile=${favori.nom}`}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <li key={index}>{favori.nom}</li>
          </Link>
        ))}
      </div>
      <input
        type="text"
        placeholder="Nom du profil"
        value={newNom}
        onChange={(e) => setNewNom(e.target.value)}
        onKeyPress={handleKeyPress} // Ajoutez le gestionnaire d'événements pour "Enter"
      />
      <br />
      <button onClick={handleAjouterCompte}>Ajouter un compte</button>
      <br />
      {erreur && <span style={{ color: 'red' }}>{erreur}</span>} 
      <br />
      <Link to="/tbm/">Menu</Link>
    </>
  );
}

export default Favori;
