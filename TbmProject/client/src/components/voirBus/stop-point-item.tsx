import { Line } from "../../BusTypes";
import { BusLine } from "./bus-line";

export type LinesProps = {
	lines: Line[];
};

export function StopPoint({ lines }: LinesProps) {
	return (
		<div className="flex flex-row flex-wrap my-3">
			{lines &&
				lines.map((line: Line) => (
						<BusLine busLine={line} />
				))}
		</div>
	);
}
