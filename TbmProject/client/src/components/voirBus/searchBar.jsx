import axios from 'axios';
import {useState} from "react";
axios.defaults.baseURL = 'http://localhost:3000';


const SearchBar = ({onSearchInputChange})  => {
    const [searchInput, setSearchInput] = useState("")
    const handleInputChange= (e) => {
        setSearchInput(e.target.value)
        onSearchInputChange(e.target.value)
    }
    return (
        <div className="search-bar">
            <div className="input">
                <input className="text-wrapper"
                       placeholder={"Rechercher un arrêt"}
                       type="text"
                       value={searchInput}
                       onChange={handleInputChange}
                />
                {/*<div className={"imageContainer"}>
                    <img className="searchIcon" alt="search" src="https://cdn-icons-png.flaticon.com/512/694/694985.png" />
                </div>*/}
            </div>
        </div>
    );
};

export default SearchBar;