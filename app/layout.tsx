import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Multi-Selection Component Demo",
	description: "A demo of the MultiSelectionWithAddRemoveButtons component",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<TooltipProvider>{children}</TooltipProvider>
			</body>
		</html>
	);
}
