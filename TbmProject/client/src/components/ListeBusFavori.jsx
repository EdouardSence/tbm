import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function ListeBusFavori(props) {
  const [favoris, setFavoris] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const chargerBusFavoris = async () => {
      try {
        const response = await axios.get(`/api/favori/getbusfavori?nom=${props.profile}`);
        const favorisData = response.data;

        if (favorisData.bus) {
          const formattedFavoris = {
            bus: favorisData.bus.map((bus) => ({
              numero: bus.numero,
              libelle: bus.libelle,
              vehicule: bus.vehicule,
              transport: {
                BUS: bus.transport.BUS.map((transport) => ({
                  destination_name: transport.destination_name,
                  lineId: transport.lineId,
                  image: `ImagesBus/${transport.lineId}.svg`,
                })),
              },
            })),
          };

          setFavoris(formattedFavoris);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des bus favoris', error);
        setIsLoading(false);
      }
    };

    chargerBusFavoris();
  }, [props.profile]);

  const supprimerBusFavori = async (numero) => {
    try {
      console.log(numero);
      // Utilisez une requête POST pour supprimer le profil
      await axios.post(`/api/supprimer-bus-favori`, { nom: props.profile, numero: numero });
    } catch (error) {
      console.error('Erreur lors de la suppression du bus', error);
    }
  };

  const obtenirHorairesBus = async (numero, ligne) => {
    try {
      const response = await fetch(`https://ws.infotbm.com/ws/1.0/get-realtime-pass/${numero}/${ligne}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des horaires des bus', error);
      return null;
    }
  };

  const [horairesBus, setHorairesBus] = useState({});

  useEffect(() => {
    const fetchHoraires = async () => {
      if (favoris.bus && favoris.bus.length > 0) {
        const horaires = await Promise.all(
          favoris.bus.map(async (bus) => {
            const horairesBus = await obtenirHorairesBus(bus.numero, bus.transport.BUS[0].lineId);
            return { numero: bus.numero, horaires: horairesBus };
          })
        );

        const horairesObj = {};
        horaires.forEach((item) => {
          horairesObj[item.numero] = item.horaires;
        });

        setHorairesBus(horairesObj);
      }
    };

    fetchHoraires();

    // Mettre à jour les horaires toutes les secondes
    const intervalId = setInterval(fetchHoraires, 1000);

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, [favoris]);

  // function formatTime(dateString) {
  //   const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  //   return new Date(dateString).toLocaleDateString('fr-FR', options);
  // }

  function updateWaitTime(departureTime) {
    const now = new Date();
    const timeDifference = Math.floor((new Date(departureTime) - now) / 1000);
    const hours = Math.floor(timeDifference / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60) + hours * 60;
    const seconds = timeDifference % 60;
    if (seconds < 0) return "Bus à l'arrêt !";
    return `${minutes} minutes, ${seconds} secondes`;
  }

  return (
    <>
      <h3>Liste des Bus Favoris</h3>
      {isLoading && <p>Chargement en cours...</p>}
      {!isLoading && (!favoris.bus || favoris.bus.length === 0) ? (
        <p>Aucun bus en favoris</p>
      ) : (
        Object.keys(horairesBus).length > 0 &&
        Object.keys(horairesBus).map((numeroBus) => {
          const busData = horairesBus[numeroBus];
          const ligne = favoris.bus[0].transport.BUS[0].lineId;
          const libelle = favoris.bus[0].libelle;
          console.log(busData);
          return (
            <div key={numeroBus}>
              <img
                src={`../ImagesBus/${ligne}.svg`}
                alt="logo"
                style={{ width: 50, height: 50, verticalAlign: "middle", padding: 10 }}
              />

              {Object.keys(busData.destinations).map((destinationId, index) => (
                <div key={index}>
                  <button onClick={() => supprimerBusFavori(numeroBus)}>Supprimer</button>
                  <h2>{libelle + "-->" + busData.destinations[destinationId][0].destination_name}</h2>
                  {busData.destinations[destinationId].map((entry, entryIndex) => (
                    <div key={entryIndex}>
                      <p>Attente: {updateWaitTime(entry.departure)}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })
      )}
    </>
  );
}

ListeBusFavori.propTypes = {
  profile: PropTypes.string,
};

export default ListeBusFavori;
