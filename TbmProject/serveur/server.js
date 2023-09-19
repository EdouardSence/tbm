const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Middleware pour gérer les demandes CORS
const app = express();
const port = 3000;

app.use(cors()); // Active CORS pour autoriser les demandes depuis le frontend

app.use(express.json()); // Middleware pour gérer les demandes JSON

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});

// Charger la liste de favoris depuis le fichier JSON
const chargerFavoris = () => {
  try {
    const favorisData = fs.readFileSync('./Favori.json', 'utf-8');
    return JSON.parse(favorisData);
  } catch (error) {
    console.error('Erreur lors du chargement des favoris', error);
    return [];
  }
};

// Route pour obtenir la liste de favoris
app.get('/api/favori/listeUser', (req, res) => {
  const favoris = chargerFavoris();
  res.json(favoris);
});

// Route pour ajouter un nouveau favori
app.post('/api/ajouter-nom', (req, res) => {
  const { nom } = req.body;

  // Charger les favoris actuels
  const favoris = chargerFavoris();

  // Ajouter le nouveau nom aux favoris
  favoris.push({ nom });

  // Écrire les favoris mis à jour dans le fichier JSON
  fs.writeFileSync('./Favori.json', JSON.stringify(favoris, null, 2));

  res.status(200).json({ message: 'Nom ajouté avec succès' });
});

app.post('/api/addbusfavori', (req, res) => {
  const { nom, busInfo } = req.body;

  // Charger les favoris actuels
  const favoris = chargerFavoris();

  // Recherche du profil correspondant
  const profilIndex = favoris.findIndex((favori) => favori.nom === nom);

  if (profilIndex === -1) {
    return res.status(400).json({ message: 'Profil introuvable' });
  }

  // Vérifier si le profil a déjà des bus, sinon initialiser le tableau
  if (!favoris[profilIndex].bus) {
    favoris[profilIndex].bus = [];
  }

  // Ajouter les informations du bus au profil
  favoris[profilIndex].bus.push(busInfo);

  // Écrire les favoris mis à jour dans le fichier JSON
  fs.writeFileSync('./Favori.json', JSON.stringify(favoris, null, 2));

  res.status(200).json({ message: 'Informations du bus ajoutées avec succès' });
});

// get les bus favoris
app.get('/api/favori/getbusfavori', (req, res) => {
  const { nom } = req.query; // Utilisez req.query pour obtenir les paramètres de requête

  // Charger les favoris actuels
  const favoris = chargerFavoris();

  // Recherche du profil correspondant
  const profil = favoris.find((favori) => favori.nom === nom);

  if (!profil) {
    return res.status(400).json({ message: 'Profil introuvable' });
  }

  res.status(200).json({ bus: profil.bus });
});



app.post('/api/supprimer-profil', (req, res) => {
  const { nom } = req.body;

  // Charger les favoris actuels
  const favoris = chargerFavoris();

  // Recherche du profil correspondant
  const profil = favoris.find((favori) => favori.nom === nom);

  if (!profil) {
    return res.status(400).json({ message: 'Profil introuvable' });
  }

  // Supprimer le profil
  favoris.splice(favoris.indexOf(profil), 1);

  // Écrire les favoris mis à jour dans le fichier JSON
  fs.writeFileSync('./Favori.json', JSON.stringify(favoris, null, 2));

  res.status(200).json({ message: 'Profil supprimé avec succès' });
});





