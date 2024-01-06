// import SearchBarBus from ".vraiTBHess/SearchBarBus";
import '../../src/assets/Css/App.css'
import { Link } from "react-router-dom";
import SearchBarBus from "../../src/components/voirBus/searchBar.jsx";
import BusList from "../../src/components/voirBus/busList.jsx";
import {useState} from "react";

const Menu = () => {
    const [searchValue, setSearchValue] = useState("")
    const handleSearchInputChange = (searchValue) => {
        setSearchValue(searchValue);
    };
    return (
        <>
            <SearchBarBus onSearchInputChange={handleSearchInputChange} placeholder="Rechercher un arrêt"/>
            <BusList searchValue={searchValue} />
            <Link to="/profiles/">Liste des profiles</Link>
        </>
    );
}

export default Menu;