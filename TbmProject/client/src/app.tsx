import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/index.css";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./components/home";
import { TBMOutlet } from "./components/tbm-outlet";

const router = createBrowserRouter([
	{
		path: "/",
		element: <TBMOutlet />,
		children: [
			{
				path: "/tbm",
				element: <Home />,
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
		],
	},
]);

const rootElement: HTMLElement | null = document.getElementById(
	"root"
) as HTMLElement;

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<NextUIProvider>
			<RouterProvider router={router} />
		</NextUIProvider>
	</React.StrictMode>
);
