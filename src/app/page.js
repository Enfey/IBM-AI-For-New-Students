"use client";

import Root from "./root/page";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function Page() {
	return (
		<ThemeProvider>
			<Root />
		</ThemeProvider>
	);
}
