"use client";

import Home from "../components/Home/Home";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function Page() {
	return (
		<ThemeProvider>
			<Home />
		</ThemeProvider>
	);
}
