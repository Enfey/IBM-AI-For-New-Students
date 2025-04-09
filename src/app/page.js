"use client";

import { ThemeProvider } from "./contexts/ThemeContext";
import LoginPage from "./login/page";

export default function Page() {
	return (
		<ThemeProvider>
			<LoginPage />
		</ThemeProvider>
	);
}
