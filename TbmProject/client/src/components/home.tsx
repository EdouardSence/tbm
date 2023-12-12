import { useState } from "react";
import { SearchBar } from "./voirBus/search-bar";
import { BusList } from "./voirBus/bus-list";

export const Home = () => {
	const [searchValue, setSearchValue] = useState("");
	const handleSearchInputChange = (searchValue: string) => {
		setSearchValue(searchValue);
	};

	return (
		<>
			<SearchBar onSearchInputChange={handleSearchInputChange} />
			<BusList searchValue={searchValue} />
		</>
	);
};
