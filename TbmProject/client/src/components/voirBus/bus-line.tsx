import { Line } from "../../BusTypes";

export type BusLineProps = {
	busLine: Line;
};

export function BusLine({ busLine }: BusLineProps) {
	const [lineType, lineName] = busLine.name.split(" ");

	lineType;

	console.log(busLine);

	return (
		<img
			src={`./ImagesBus/${lineName}.svg`}
			alt="logo"
			width={30}
			className="mr-4"
		/>
	);
}
