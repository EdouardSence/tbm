import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams  } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function ListeUser() {
    const [infoUser, setInfoUser] = useState([]);
    const { profile } = useParams();


    useEffect(() => {
        const chargerInfoUser = async () => {
            try {
                const response = await axios.get(`/api/user/info-user?nom=${profile}`);
                setInfoUser(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des profiles', error);
            }
        };

        chargerInfoUser();
    }, [profile]); 

    const supprimerUser = async () => {
        try {
            await axios.delete(`/api/user/supprimer-user?nom=${profile}`);
            toast.success('Le profile a bien été supprimé');
            window.location.href = '/tbm/profiles/';
        } catch (error) {
            toast.error('Erreur lors de la suppression du profile');
            console.error('Erreur lors de la suppression du profile', error);
        }
    }

    return (
        <>
            <h3>Wsh {infoUser.nom}</h3>
            <Link to="/tbm/">Retour à la page principale</Link>
            <button onClick={supprimerUser}>Supprimer le profil</button>
            <Toaster 
              position="top-right"
              reverseOrder={false}
            />

        </>
    );
}

export default ListeUser;
