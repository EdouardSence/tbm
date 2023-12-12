import { Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Icons } from "../icons";
axios.defaults.baseURL = "http://localhost:3000";

type SearchBarType = {
	onSearchInputChange: (searchValue: string) => void;
};

export function SearchBar({ onSearchInputChange }: SearchBarType) {
	const [searchInput, setSearchInput] = useState("");
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement> | null
	) => {
		setSearchInput(event?.target.value ?? "");
		onSearchInputChange(event?.target.value ?? "");
	};

	return (
		<div className="flex w-full justify-center md:flex-nowrap">
			<Input
				isClearable
				onClear={() => handleInputChange(null)}
				size="md"
				placeholder="Ex: Village 6"
				className="w-72 flex justify-center"
				classNames={{
					innerWrapper: "pb-0",
				}}
				labelPlacement="outside"
				onChange={handleInputChange}
				value={searchInput}
				startContent={
					<Icons.search color="gray" className="m-1" size={16} />
				}
			/>
		</div>
	);
}
