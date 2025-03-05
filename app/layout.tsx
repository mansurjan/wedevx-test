import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-montserrat",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Alma LegalTech",
	description: "Your destionation is safe with us",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${montserrat.variable}`}>
			<body className={`${montserrat.className}`}>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
