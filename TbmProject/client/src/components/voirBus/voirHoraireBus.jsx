import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function ViewBus() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const line = params.get("line");
    const stop_point = params.get("stop_point");
    const lineID = params.get("lineID");
    const route = params.get("route");

    const [busData, setBusData] = useState(null);

    // Fonction pour effectuer une nouvelle requête toutes les secondes
    const fetchData = () => {
        fetch(`https://ws.infotbm.com/ws/1.0/get-realtime-pass-by-id/${line}/${stop_point}/${lineID}/${route}`)
            .then((response) => response.json())
            .then((data) => setBusData(data))
            .catch((error) => console.error('Error fetching bus data', error));
    };

    useEffect(() => {
        // Effectuez la première requête lorsque le composant est monté
        fetchData();

        // Définir l'intervalle pour actualiser les données chaque seconde
        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => {
            clearInterval(intervalId);
        };
    });

    return (
        <div>
            {busData ? (
                <>
                    <img src={`./ImagesBus/${lineID}.svg`} alt="logo" style={{ width: 50, height: 50, verticalAlign: "middle", padding: 10 }} />
                
                    {busData.destinations.length !== 0 ? (
                        <>
                            {
                                Object.keys(busData.destinations).map((destinationId, index) => (
                                    <div key={index}>
                                        <h2>{busData.destinations[destinationId][0].destination_name}</h2>
                                        {busData.destinations[destinationId].map((entry, entryIndex) => (
                                            <div key={entryIndex}>
                                                <p>Prochain départ: {formatTime(entry.departure)}</p>
                                                <p>Attente: {updateWaitTime(entry.departure)}</p>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            }
                        </>
                    ) : (
                        <p>Pas de bus en circulation</p>
                    )}

                </>
            ) : (
                <p>Loading...</p>
            )}
            <Link to="/tbm/">Retour à la page principale</Link>
        </div>
    );
}

function formatTime(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function updateWaitTime(departureTime) {
    const now = new Date();
    const timeDifference = Math.floor((new Date(departureTime) - now) / 1000);
    const hours = Math.floor(timeDifference / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60) + hours * 60;
    const seconds = timeDifference % 60;
    if (seconds < 0) return "Bus à l'arrêt !";
    return `${minutes} minutes, ${seconds} secondes`;
}
export default ViewBus;
