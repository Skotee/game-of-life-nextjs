import "./globals.css";
import { Metadata } from "next/types";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

import SessionProvider from "./components/SessionProvider";
import NavMenu from "./components/NavMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Chatbot",
	description: "Using Azure AI",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();

	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider session={session}>
					<main className="mx-auto max-w-5xl text-2xl flex gap-2 text-white">
						<NavMenu />
						{children}
					</main>
				</SessionProvider>
			</body>
		</html>
	);
}
