import { Link } from "react-router-dom";
import { useState } from "react";
import { SearchBar } from "./voirBus/search-bar";
import { BusList } from "./voirBus/bus-list";

export const Menu = () => {
	const [searchValue, setSearchValue] = useState("");
	const handleSearchInputChange = (searchValue: string) => {
		setSearchValue(searchValue);
	};

	return (
		<>
			<SearchBar onSearchInputChange={handleSearchInputChange} />
			<BusList searchValue={searchValue} />
			<Link to="/tbm/profiles/">Liste des profiles</Link>
		</>
	);
};
