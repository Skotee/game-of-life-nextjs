import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

async function main() {
	const client = new OpenAIClient(
		"https://ai-proxy.epam-rail.com",
		new AzureKeyCredential("336c555575c24ffda8cb24d8bc867718")
	);

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
		c;
	}
	console.log(resp);
}

main().catch((err) => {
	console.error("The sample encountered an error:", err);
});

export default main;
