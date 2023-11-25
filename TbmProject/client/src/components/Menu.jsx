import SearchBarBus from "./voirBus/searchBar.jsx";
import { Link } from "react-router-dom";
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
            <Link to="/tbm/favori/">Favori</Link>
        </>
    );
}

export default Menu;