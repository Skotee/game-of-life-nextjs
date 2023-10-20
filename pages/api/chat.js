import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
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
