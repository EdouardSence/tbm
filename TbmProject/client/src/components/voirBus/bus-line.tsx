import { Line } from "../../BusTypes";

export type BusLineProps = {
	busLine: Line;
};

export function BusLine({ busLine }: BusLineProps) {
	return (
		<img
			src={busLine.iconUrl}
			alt="logo"
			width={30}
			className="mr-4"
		/>
	);
}
