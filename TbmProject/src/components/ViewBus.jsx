import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function ViewBus() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const numero = params.get("numero");
    const ligne = params.get("ligne");
    const [busData, setBusData] = useState(null);

    useEffect(() => {
        fetch(`https://ws.infotbm.com/ws/1.0/get-realtime-pass/${numero}/${ligne}`)
            .then((response) => response.json())
            .then((data) => setBusData(data))
            .catch((error) => console.error('Error fetching bus data', error));
    });

    return (
        <div>
            {busData ? (
                <>
                    <h2>Bus Information</h2>
                    {/* <p>Destination: {busData.destinations[0]?.destination_name}</p>
                    <p>Prochain départ dans: {calculateTime(busData.departure)}</p> */}
                    {/* Render other bus-related information */}
                </>
            ) : (
                <p>Loading...</p>
            )}
            <Link to="/tbm">Retour à la page principale</Link>
        </div>
    );
}

// function calculateTime(departureTime) {
//     const now = new Date();
//     const timeDifference = Math.floor((departureTime - now) / 1000);
//     const hours = Math.floor(timeDifference / 3600);
//     const minutes = Math.floor((timeDifference % 3600) / 60);
//     const seconds = timeDifference % 60;

//     return `${hours} heures, ${minutes} minutes, ${seconds} secondes`;
// }

export default ViewBus;
