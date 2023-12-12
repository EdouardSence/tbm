import {
	Button,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Icons } from "./icons";

export function TBMNavbar() {
	return (
		<Navbar
			className="h-24 flex-grow bg-color-none z-0 absolute"
			maxWidth="full"
			isBlurred={false}>
			<NavbarContent>
				<NavbarBrand>
					<img src="logo_tbhess.png" className="h-20" />
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent justify="center" className="mr-2">
				<NavbarItem>
					<Link to="/tbm/profiles/">
						<Button
							size="sm"
							variant="flat"
							className="text-gray text-sm"
							startContent={
								<Icons.usersList color="gray" size={16} />
							}>
							Liste des profils
						</Button>
					</Link>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
