import { Link } from "react-router-dom";
import { Route, StopPointType } from "../../BusTypes";
import { BusLine } from "./bus-line";

export type StopPointProps = {
	stopPoint: StopPointType;
};

export function StopPoint({ stopPoint }: StopPointProps) {
	return (
		<div>
			{stopPoint.routes &&
				stopPoint.routes.map((route: Route) => (
					<div key={route.id} className="my-8">
						<Link
							to={`voir-horaires?line=${
								route.line.id
							}&stop_point=${stopPoint.id}&lineID=${
								route.line.name.split(" ")[1]
							}&route=${route.id}`}
							style={{
								color: "black",
							}}>
							<p className="flex flex-row">
								<BusLine busLine={route.line} />
								{stopPoint.name} - {route.name}
							</p>
						</Link>
					</div>
				))}
		</div>
	);
}
