import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header/header";
import Installation from "@/components/installation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Multi-Selection Component Demo",
	description: "By @sherifAwad",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<TooltipProvider>
						<Header />
						<Installation />
						{children}
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
