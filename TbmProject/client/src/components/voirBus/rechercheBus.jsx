import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
axios.defaults.baseURL = 'http://localhost:3000';

function ResercheBus() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function extractValue(line) {
    // si le nom de la ligne commence par Flex'Night, renvoyer la valeur du caractere juste apres
    if (line.name && line.name.startsWith('Flex\'Night')) {
      return `TBN${line.name.charAt(11)}`;
    }
    if (line.name && line.name.includes(' ')) {
      // S'il y a un espace dans le nom, extrayez la valeur après le dernier espace
      const lastSpaceIndex = line.name.lastIndexOf(' ');
      const valueAfterSpace = line.name.substring(lastSpaceIndex + 1);

      // Vérifiez si la valeur après l'espace est un chiffre et sa taille n'est pas égale à 1
      if (/^\d+$/.test(valueAfterSpace) && valueAfterSpace.length !== 1) {
        return valueAfterSpace;
      }
    }

    // Si la valeur après l'espace n'est pas un chiffre, ou si sa taille est égale à 1,
    // extrayez les chiffres après le dernier ":"
    if (line.id && line.id.includes(':')) {
      const lastColonIndex = line.id.lastIndexOf(':');
      return line.id.substring(lastColonIndex + 1);
    }

    return 'gragawan';
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length < 1) {
        setSearchResults([]);
        return;
      }

      let listBus = [];
      const response = await axios.get(`https://ws.infotbm.com/ws/1.0/get-schedule/${searchTerm}?referer=www`);
      if (response.data.length === 0) {
        setSearchResults([]);
        return;
      }
      for (let i = 0; i < response.data.length; i++) {
        const stop = response.data[i].url;
        const response2 = await axios.get(stop);
        if (response2.length !== 0) {
          let responseTMP =
          {
            id: response2.data.id,
            name: response2.data.name,
            stopPoints: [],
          };
          if (response2.data.stopPoints) {
            for (let j = 0; j < response2.data.stopPoints.length; j++) {
              const stopPoint = response2.data.stopPoints[j].id;
              // on enleve les bus scolaires et les trains pcq ca fait chier
              if (stopPoint.substring(11, 14) !== 'TBS' && stopPoint.substring(11, 14) !== 'BTD' && stopPoint.substring(11, 14) !== 'SNC') {
                responseTMP.stopPoints.push(response2.data.stopPoints[j]);
              }
            }
          }
          listBus.push(responseTMP);
        }
      }

      setSearchResults(listBus);
    }, 400);

    // Nettoyer le timeout précédent à chaque changement de terme de recherche
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="listBus">
          {searchResults.map((result) => (
            <div key={result.id}>
              {result.stopPoints && result.stopPoints.map((stopPoint) => (
                <div key={stopPoint.id}>
                  {stopPoint.routes && stopPoint.routes.map((route) => (
                    <div key={route.id}>
                      <Link
                        to={`voir-horaires?line=${route.line.id}&stop_point=${stopPoint.id}&lineID=${extractValue(route.line)}&route=${route.id}`}
                        style={{ color: "white" }}
                      >
                        <p>
                          <img
                            src={`./ImagesBus/${extractValue(route.line)}.svg`}
                            alt="logo"
                            style={{ width: 50, height: 50, verticalAlign: "middle", padding: 10 }}
                          />
                          {result.name} - {route.name}</p>
                      </Link>
                    </div>
                  ))
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

ResercheBus.propTypes = {
  viewbus: PropTypes.bool,
  profile: PropTypes.string,
};

export default ResercheBus;



{/* <>
<Link
  to={`viewBus?numero=${result.numero}&ligne=${result.transport?.BUS?.[0]?.lineId}`}
  style={{ color: "white" }}
>
  <div className="bus">
    <div className="busInfo">
      <p>{result.name}</p>
      </div>
    </div>
</Link>
</> */}