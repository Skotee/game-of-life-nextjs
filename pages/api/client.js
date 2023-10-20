// client.js

async function fetchChatResponse() {
	try {
		const response = await fetch("/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("An error occurred while fetching the chat response.");
		}

		const data = await response.json();
		console.log(data.response);
	} catch (err) {
		console.error("Error:", err);
	}
}

fetchChatResponse();
