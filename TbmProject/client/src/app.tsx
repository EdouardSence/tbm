import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/index.css";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./components/home";
import BusScreen from "./components/voirBus/bus-screen";
import { TBMOutlet } from "./components/tbm-outlet";
import StopScreen from "./components/voirBus/stop-screen";

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
				path: "/voir-horaires/bus/",
				element: <BusScreen />,
			},
			{
				path: "/voir-horaires/stop/:stop_area",
				element: <StopScreen />,
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
