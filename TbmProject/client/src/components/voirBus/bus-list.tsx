import { useState, useEffect } from "react";
import axios from "axios";
import { BusType, StopPointType } from "../../BusTypes";
import { StopPoint } from "./stop-point-item";
axios.defaults.baseURL = "http://localhost:3000";

type BusListProps = {
	searchValue: string;
};

export const BusList = ({ searchValue }: BusListProps) => {
	const [searchResults, setSearchResults] = useState<BusType[]>([]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			if (searchValue.length === 0) {
				setSearchResults([]);
				return;
			}

			const listBus: BusType[] = [];
			const response = await axios.get(
				`https://ws.infotbm.com/ws/1.0/get-schedule/${searchValue}?referer=www`
			);
			if (response.data.length === 0) {
				setSearchResults([]);
				return;
			}
			for (let i = 0; i < response.data.length; i++) {
				const stop = response.data[i].url;
				const response2 = await axios.get(stop);
				if (response2.data.length !== 0) {
					const responseTMP: BusType = {
						id: response2.data.id,
						name: response2.data.name,
						stopPoints: [],
					};
					if (response2.data.stopPoints) {
						for (
							let j = 0;
							j < response2.data.stopPoints.length;
							j++
						) {
							const stopPoint = response2.data.stopPoints[j].id;
							// on enleve les bus scolaires et les trains pcq ca fait chier
							if (
								stopPoint.substring(11, 14) !== "TBS" &&
								stopPoint.substring(11, 14) !== "BTD" &&
								stopPoint.substring(11, 14) !== "SNC"
							) {
								responseTMP.stopPoints.push(
									response2.data.stopPoints[j]
								);
							}
						}
					}
					listBus.push(responseTMP);
				}
			}
			console.log(listBus);
			setSearchResults(listBus);
		}, 400);

		// Nettoyer le timeout précédent à chaque changement de terme de recherche
		return () => clearTimeout(delayDebounceFn);
	}, [searchValue]);

	return (
		<>
			<div>
				{searchResults.map((result: BusType) => (
					<div key={result.id}>
						{result.stopPoints &&
							result.stopPoints.map(
								(stopPoint: StopPointType) => (
									<div key={stopPoint.id}>
										<StopPoint stopPoint={stopPoint} />
									</div>
								)
							)}
					</div>
				))}
			</div>
		</>
	);
};
