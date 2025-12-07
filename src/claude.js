export async function testClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": import.meta.env.VITE_CLAUDE_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await res.json();
  console.log("Claude says:", data.content[0].text);
}
