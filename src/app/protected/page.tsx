import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Chat from "../components/Chat";

export default async function ProtectedRoute() {
	const session = await getServerSession();
	if (!session || !session.user) {
		redirect("/api/auth/signin");
	}

	return (
		<main className="flex flex-col items-center justify-between p-12">
			<h2>Hello, welcome to the AI Chatbot</h2>
			<Chat></Chat>
		</main>
	);
}
