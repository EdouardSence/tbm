import { Outlet } from "react-router-dom";
import { VersionLabel } from "./verion-label";
import { TBMNavbar } from "./tbm-navbar";

export function TBMOutlet() {
	return (
		<>
			<TBMNavbar />
			<div className="min-h-screen flex justify-center items-center">
				<div className="thin-border border-gray p-14 mx-auto flex flex-col justify-center items-center blur-background">
					<Outlet />
					<VersionLabel version="0.0.1-alpha" />
				</div>
			</div>
		</>
	);
}
