"use client";

import React, { useState } from "react";

interface Message {
	content: string;
	isUser: boolean;
}

const Chat: React.FC = () => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);

	async function handleSendMessage() {
		const userMessage = "Hello, AI!";
		const response = await fetch("http://localhost:3000/pages/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userMessage }),
		});
		return response;
	}

	function sendMessage(message: string) {
		const userMessage = "Hello, AI!";

		const data = response.json();
		console.log("AI response:", data);
		setMessages([
			...messages,
			{ content: message, isUser: true },
			{ content: data.response, isUser: false },
		]);
		setMessage("");
		// `data.response` contains the generated GPT model response.
	}

	// Handler for input changes
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		setMessage(event.target.value);
	};

	// Handler for form submission
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (message.trim()) {
			sendMessage(message);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center p-4 text-black">
			<div className="w-full max-w-md">
				<div className="bg-white shadow-md rounded p-8">
					<div className="h-64 overflow-y-auto mb-4">
						{messages.map((msg, index) => (
							<div
								key={index}
								className={`p-2 rounded mb-2 ${
									msg.isUser
										? "bg-blue-500 text-white self-end"
										: "bg-gray-200 self-start"
								}`}
							>
								{msg.content}
							</div>
						))}
					</div>
					<form onSubmit={handleSubmit} className="flex">
						<input
							type="text"
							placeholder="Type your message..."
							value={message}
							onChange={handleInputChange}
							className="w-full rounded-l-md p-2 outline-none"
						/>
						<button
							type="submit"
							className="bg-blue-500 text-white px-8 py-2 rounded-r-md"
						>
							Send
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Chat;
