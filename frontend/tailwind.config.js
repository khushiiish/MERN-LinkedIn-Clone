import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				linkedin: {
					blue: "#0A66C2",
					"blue-hover": "#004182",
					"blue-active": "#09223b",
					canvas: "#F4F2EE",
					card: "#FFFFFF",
					border: "#E0DFDC",
					"border-light": "#EBEBEB",
					"text-primary": "rgba(0, 0, 0, 0.9)",
					"text-secondary": "rgba(0, 0, 0, 0.6)",
					"text-subtle": "rgba(0, 0, 0, 0.4)",
					gold: "#915907",
					"gold-bg": "#F8C77E",
					green: "#057642",
					"green-hover": "#03522e",
				},
			},
			fontFamily: {
				linkedin: [
					"-apple-system",
					"system-ui",
					"BlinkMacSystemFont",
					'"Segoe UI"',
					"Roboto",
					"Helvetica",
					"Arial",
					"sans-serif",
				],
			},
			maxWidth: {
				linkedin: "1128px",
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				linkedin: {
					primary: "#0A66C2", // LinkedIn Blue
					secondary: "#FFFFFF", // White
					accent: "#057642", // LinkedIn Green
					neutral: "#000000", // Black
					"base-100": "#F4F2EE", // LinkedIn Canvas Gray
					info: "#5E5E5E", // Dark Gray
					success: "#057642", // Dark Green
					warning: "#F5C75D", // Yellow
					error: "#CC1016", // Red
				},
			},
		],
	},
};
