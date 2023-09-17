import { useState } from 'react';
import FavoriListe from '../assets/json/Favori.json';


function Favori() {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture/fermeture de la boîte de dialogue
  const [nom, setNom] = useState(''); // État pour stocker le nom entré
  // const [listeNoms, setListeNoms] = useState([]); // État pour stocker la liste des noms

  const ouvrirModal = () => {
    setIsModalOpen(true);
  };

  const fermerModal = () => {
    setIsModalOpen(false);
  };

  const ajouterNom = () => {
    if (nom.trim() !== '') {
      // write the name to the json file
      FavoriListe.push({ nom });
      // Ajouter le nom à la liste
      // setListeNoms([...listeNoms, { nom }]);
      // Réinitialiser le champ de saisie
      setNom('');
      // Fermer la boîte de dialogue
      fermerModal();
    }
  };

  return (
    <>
      <h1>Favori</h1>
      <div className="Liste Compte">
        <ul>
          {FavoriListe.map((item) => (
            <li key={item.nom}>{item.nom}</li>
          ))}
        </ul>
      </div>
      <button onClick={ouvrirModal}>Ajouter un compte</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ajouter un nom</h2>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Entrez un nom"
            />
            <button onClick={ajouterNom}>Ajouter</button>
            <button onClick={fermerModal}>Annuler</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Favori;
