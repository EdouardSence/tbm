import { useState, useEffect } from "react";
import axios from "axios";
import { BusItemType } from "../../BusTypes";
import { StopPoint } from "./stop-point-item";
import { Link } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3000";

type BusListProps = {
	searchValue: string;
};

export const BusList = ({ searchValue }: BusListProps) => {
	const [searchResults, setSearchResults] = useState<BusItemType[]>([]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			if (searchValue.length === 0) {
				setSearchResults([]);
				return;
			}

			// const listBus: BusItemType[] = [];
			const response = await axios.get(
				`https://gateway-apim.infotbm.com/maas-web/web/v2/places/stops/search?query=${searchValue}`
			);

			const data: BusItemType[] = response.data.places;
			setSearchResults(data);
		}, 400);

		// Nettoyer le timeout précédent à chaque changement de terme de recherche
		return () => clearTimeout(delayDebounceFn);
	}, [searchValue]);

	return (
		<>
			<div>
				{searchResults.map((result: BusItemType) => (
					<Link
						to={'/voir-horaires/stop/' + result.id}
						style={{
							color: "black",
						}}
						className="flex items-center">
						<div key={result.id}>
							<h3 className="mt-3">{result.name}</h3>
							<StopPoint lines={result.lines} />
						</div>
				</Link>
				))}
			</div>
		</>
	);
};
