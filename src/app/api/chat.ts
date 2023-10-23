import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { IncomingMessage } from "http";

function setupSSE(req: IncomingMessage, res: NextApiResponse) {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-cache");
	res.setHeader("Connection", "keep-alive");

	// Heartbeat to keep the connection alive
	setInterval(() => {
		res.write("data: heartbeat\n\n");
	}, 20000);

	req.on("close", () => {
		res.end();
	});
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.query.sse) {
		// Set up SSE connection if the ?sse query parameter is present in the URL
		setupSSE(req, res);
	}

	const client = new OpenAIClient(
		"https://ai-proxy.lab.epam.com",
		new AzureKeyCredential("336c555575c24ffda8cb24d8bc867718")
	);

	const userMessage = req.body.userMessage;
	const events = client.listChatCompletions("gpt-4", [
		{ role: "user", content: "How are you?" },
	]);

	let resp = "";
	for await (const event of events) {
		for (const choice of event.choices) {
			const delta = choice.delta?.content;
			if (delta !== undefined) {
				resp += delta;
			}
		}
	}

	res.json({ response: resp });
}
