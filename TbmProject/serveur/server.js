const express = require("express");
const fs = require("fs");
const cors = require("cors"); // Middleware pour gérer les demandes CORS
const app = express();
const port = 3000;

app.use(cors()); // Active CORS pour autoriser les demandes depuis le frontend

app.use(express.json()); // Middleware pour gérer les demandes JSON

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});

// Charger la liste de favoris depuis le fichier JSON
const getListeUsers = () => {
  try {
    const favorisData = fs.readFileSync("./Favori.json", "utf-8");
    return JSON.parse(favorisData);
  } catch (error) {
    console.error("Erreur lors du chargement des favoris", error);
    return [];
  }
};

// ----------------- USER ----------------- //

// GET liste des users
app.get("/api/user/liste-user", (req, res) => {
  const favoris = getListeUsers();
  res.json(favoris);
});

// POST ajouter un user
app.post("/api/user/ajouter-user", (req, res) => {
  const { nom } = req.query;
  const nomDecode = decodeURI(nom);

  const listUser = getListeUsers();

  // Vérifier si le nom n'est pas vide
  if (!nomDecode || nomDecode === "") {
    return res.status(400).json({ message: "Nom vide" });
  }

  // Vérifier si le nom existe déjà
  const profil = listUser.find((user) => user.nom === nomDecode);

  if (profil) {
    return res.status(400).json({ message: "Nom déjà existant" });
  }

  // Ajouter le nouveau nom aux favoris
  listUser.push({
    nom: nomDecode,
  });

  // Écrire les favoris mis à jour dans le fichier JSON
  fs.writeFileSync("./Favori.json", JSON.stringify(listUser, null, 2));

  res.status(200).json({ message: "Nom ajouté avec succès" });
});

// DELETE supprimer un user
app.delete("/api/user/supprimer-user", (req, res) => {
  const { nom } = req.query;
  const nomDecode = decodeURI(nom);

  const listUser = getListeUsers();

  const index = listUser.findIndex((user) => user.nom === nomDecode);

  if (index === -1) {
    return res.status(400).json({ message: "Profil introuvable" });
  }

  // Supprimer le profil
  listUser.splice(index, 1);

  // Écrire les favoris mis à jour dans le fichier JSON
  fs.writeFileSync("./Favori.json", JSON.stringify(listUser, null, 2));

  res.status(200).json({ message: "Profil supprimé avec succès" });
});

// GET les infos d'un user
app.get("/api/user/info-user", (req, res) => {
  const { nom } = req.query;
  const nomDecode = decodeURI(nom);

  const listUser = getListeUsers();

  const profil = listUser.find((user) => user.nom === nomDecode);

  if (!profil) {
    return res.status(400).json({ message: "Profil introuvable" });
  }

  res.status(200).json(profil);
});

// ----------------- BUS ----------------- //
app.post("/api/bus/ajouter-bus-favori", (req, res) => {
  const { nom, busInfo } = req.body;

  // Charger les favoris actuels
  const favoris = getListeUsers();

  // Recherche du profil correspondant
  const profilIndex = favoris.findIndex((favori) => favori.nom === nom);

  if (profilIndex === -1) {
    return res.status(400).json({ message: "Profil introuvable" });
  }

  // Vérifier si le profil a déjà des bus, sinon initialiser le tableau
  if (!favoris[profilIndex].bus) {
    favoris[profilIndex].bus = [];
  }

  // Ajouter les informations du bus au profil
  favoris[profilIndex].bus.push(busInfo);

  // Écrire les favoris mis à jour dans le fichier JSON
  fs.writeFileSync("./Favori.json", JSON.stringify(favoris, null, 2));

  res.status(200).json({ message: "Informations du bus ajoutées avec succès" });
});

// get les bus favoris
app.get("/api/bus/liste-bus-favoris", (req, res) => {
  const { nom } = req.query; // Utilisez req.query pour obtenir les paramètres de requête

  // Charger les favoris actuels
  const favoris = getListeUsers();

  // Recherche du profil correspondant
  const profil = favoris.find((favori) => favori.nom === nom);

  if (!profil) {
    return res.status(400).json({ message: "Profil introuvable" });
  }

  res.status(200).json({ bus: profil.bus });
});

app.post("/api/bus/supprimer-bus-favori", (req, res) => {
  const { nom, numero } = req.body;

  // Charger les favoris actuels
  const favoris = getListeUsers();

  // Recherche du profil correspondant
  const profil = favoris.find((favori) => favori.nom === nom);

  if (!profil) {
    return res.status(400).json({ message: "Profil introuvable" });
  }

  // Recherche du bus correspondant
  const busIndex = profil.bus.findIndex((bus) => bus.numero === numero);

  if (busIndex === -1) {
    return res.status(400).json({ message: "Bus introuvable" });
  }

  // Supprimer le bus
  profil.bus.splice(busIndex, 1);

  // Écrire les favoris mis à jour dans le fichier JSON
  fs.writeFileSync("./Favori.json", JSON.stringify(favoris, null, 2));

  res.status(200).json({ message: "Bus supprimé avec succès" });
});
