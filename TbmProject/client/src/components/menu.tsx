import { Link } from "react-router-dom";
import { useState } from "react";
import { SearchBar } from "./voirBus/search-bar";
import { BusList } from "./voirBus/bus-list";
import { Button } from "@nextui-org/react";
import { Icons } from "./icons";

export const Menu = () => {
	const [searchValue, setSearchValue] = useState("");
	const handleSearchInputChange = (searchValue: string) => {
		setSearchValue(searchValue);
	};

	return (
		<>
			<SearchBar onSearchInputChange={handleSearchInputChange} />
			<BusList searchValue={searchValue} />
			<Link to="/tbm/profiles/">
				<Button size="sm" color="" className="text-gray text-sm" startContent={<Icons.usersList color="gray" size={16} />}>
					Liste des profils
				</Button>
			</Link>
		</>
	);
};
