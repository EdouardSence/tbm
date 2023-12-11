import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Icons } from "../icons";
axios.defaults.baseURL = "http://localhost:3000";

type SearchBarType = {
	onSearchInputChange: (searchValue: string) => void;
};

export function SearchBar({ onSearchInputChange }: SearchBarType) {
	const [searchInput, setSearchInput] = useState("");
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
		onSearchInputChange(event.target.value);
	};

	return (
		<div className="flex w-full justify-center md:flex-nowrap">
			<Input
				size="md"
				placeholder="Ex: Village 6"
				className="w-72 flex justify-center"
				classNames={{
					innerWrapper: "pb-0",
				}}
				labelPlacement="outside"
				onChange={handleInputChange}
				value={searchInput}
				endContent={
					<Button size="sm" color="primary" className="text-white font-medium rounded-xl -mr-2">
						Recherche
					</Button>
				}
			/>
		</div>
	);
}
