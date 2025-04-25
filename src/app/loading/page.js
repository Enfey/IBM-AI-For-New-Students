"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import "./loading-page.scss";
import withAuth from "@/components/AuthBlock/AuthBlock";

function LoadingPage() {
    const router = useRouter();

	// Splash screen after 4.5 seconds
	useEffect(() => {
		let timer;
        timer = setTimeout(() => {router.push("/chat")}, 4500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="container">
			<div className="splash-screen">
				{/* background */}
				<div className="particles">
					{[...Array(20)].map((_, i) => (
						<div
							key={i}
							className="particle"
							style={{
								"--size": `${Math.random() * 10 + 5}px`,
								"--delay": `${Math.random() * 2}s`,
								"--duration": `${2 + Math.random() * 3}s`,
								"--posX": `${Math.random() * 100}%`,
								"--posY": `${Math.random() * 100}%`,
							}}
						/>
					))}
				</div>

				<div className="content">
					<p className="subtitle animate-subtitle">
						Nottingham Watsonx Assistant
					</p>
					<div className="progress-bar animate-progress">
						<div className="progress-fill" />
					</div>
					<div className="team animate-team">Powered by Team 32</div>
				</div>
			</div>
		</div>
	);
}

export default withAuth(LoadingPage);
