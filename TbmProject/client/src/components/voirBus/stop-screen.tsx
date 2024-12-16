/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stop, NextDeparture } from "../../BusTypes";

const StopScreen: React.FC = () => {
  const { stop_area } = useParams();

  const [busData, setBusData] = useState<Stop | null>(null);
  const [groupedDepartures, setGroupedDepartures] = useState<
    Record<string, NextDeparture[]>
  >({});

  // Fonction pour effectuer une nouvelle requête toutes les secondes
  const fetchData = () => {
    fetch(
      `https://gateway-apim.infotbm.com/maas-web/web/v3/timetables/stops/${stop_area}`
    )
      .then((response) => response.json())
      .then((data: Stop) => {
        setBusData(data);
        groupDepartures(data.nextDepartures);
      })
      .catch((error) => console.error("Error fetching bus data", error));
  };

  const groupDepartures = (departures: NextDeparture[]) => {
    const grouped = departures.reduce((groups, departure) => {
      const { id } = departure.route;
      if (!groups[id]) groups[id] = [];
      groups[id].push(departure);
      return groups;
    }, {} as Record<string, NextDeparture[]>);

    setGroupedDepartures(grouped);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateWaitTime = (departureTime: string): string => {
    const now = new Date();
    const timeDifference = Math.floor(
      (new Date(departureTime).getTime() - now.getTime()) / 1000
    );
  
    if (timeDifference < 0) return `Bus à l'arrêt !`;
  
    const hours = Math.floor(timeDifference / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    const seconds = timeDifference % 60;
  
    const pluralize = (value: number, unit: string): string =>
      `${value} ${unit}${value > 1 ? "s" : ""}`;
  
    if (hours > 0) return `${pluralize(hours, "heure")} ${pluralize(minutes, "minute")} ${pluralize(seconds, "seconde")}`;
    if (minutes > 0) return `${pluralize(minutes, "minute")} ${pluralize(seconds, "seconde")}`;
    return pluralize(seconds, "seconde");
  };
  

  return (
    <div>
      {busData ? (
        <>
          {/* Titre principal */}
          <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
            {busData.name}
          </h1>

          {/* Affichage des départs groupés */}
          {Object.entries(groupedDepartures).map(
            ([id, departures]) => (
              <div key={id} style={{ marginBottom: "20px" }}>
                {/* Liste des départs pour le terminus */}
                {departures.map((departure: NextDeparture) => (
                  <div
                    key={departure.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {/* Icône de la ligne */}
                    <div style={{ marginRight: "10px" }}>
                      <img
                        src={departure.line.iconUrl}
                        alt={`${departure.line.name} icon`}
                        style={{ width: "40px", height: "40px" }}
                      />
                    </div>

                    {/* Nom de la ligne */}
                    <div style={{ flex: "1", overflowWrap: "break-word", wordWrap: "break-word" }}>
                      <h3
                        style={{
                          margin: "0",
                          fontSize: "1rem",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          maxWidth: "90%", // Limite la largeur (ajustez selon vos besoins)
                        }}
                      >
                        {departure.route.terminus}
                      </h3>
                    </div>

                    {/* Temps d'attente */}
                    <div style={{ textAlign: "right" }}>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {updateWaitTime(departure.departure)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Ligne de séparation après chaque groupe */}
                <div
                  style={{
                    borderBottom: "1px solid rgb(204, 204, 204)",
                    marginTop: "10px",
                  }}
                />
              </div>
            )
          )}
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default StopScreen;
