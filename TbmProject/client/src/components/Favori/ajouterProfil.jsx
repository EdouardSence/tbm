import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import SearchBarBus from "../voirBus/searchBar.jsx";

function ListeUser() {
    const [searchValue, setSearchValue] = useState("")
    const handleSearchInputChange = (searchValue) => {
        setSearchValue(searchValue);
    };

    const ajouterUser = async () => {
        try {
            await axios.post(`/api/user/ajouter-user?nom=${searchValue}`);
            toast.success('Le profile a bien été supprimé');
            window.location.href = `/tbm/profile/${searchValue}`;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <SearchBarBus onSearchInputChange={handleSearchInputChange} placeholder="Ajouter un profil"/>
            <button onClick={ajouterUser}>Ajouter le profil</button>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

        </>
    );
}

export default ListeUser;
