// import SearchBarBus from ".vraiTBHess/SearchBarBus";
import '../assets/Css/App.css'
import { Link } from "react-router-dom";
import SearchBarBus from "./voirBus/searchBar.jsx";
import BusList from "./voirBus/busList.jsx";
import {useState} from "react";

const Menu = () => {
    const [searchValue, setSearchValue] = useState("")
    const handleSearchInputChange = (searchValue) => {
        setSearchValue(searchValue);
    };
    return (
        <>
            <SearchBarBus onSearchInputChange={handleSearchInputChange}/>
            <BusList searchValue={searchValue} />
            <Link to="/tbm/profiles/">Liste des profiles</Link>
        </>
    );
}

export default Menu;