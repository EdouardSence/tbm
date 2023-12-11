import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/index.css";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Menu } from "./components/menu";
import logo from "../public/logo_tbhess.png";
import { Icons } from "./components/icons";
import { VersionLabel } from "./components/verion-label";

const router = createBrowserRouter([
	{
		path: "/tbm",
		element: <Menu />,
	},
	{
		path: "/profile/:profile",
		// element: <ProfileInfo />,
	},
	{
		path: "/profiles/",
		// element: <ListeUser />,
	},
	{
		path: "/voir-horaires/",
		// element: <BusScreen />,
	},
]);

const rootElement: HTMLElement | null = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<NextUIProvider>
			<div className="relative border-gray border-small p-20 m-6 rounded-xl flex flex-col items-center min-w-full gap-10">
				<img src={logo} className="h-20" />
				<RouterProvider router={router} />
				<VersionLabel version="1.0.1" />
			</div>
		</NextUIProvider>
	</React.StrictMode>
);
