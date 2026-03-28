/**
 * OpenAI-Compatible request to Google Gemini
 */
export function mapOpenAiToGemini(request: any) {
  const contents = request.messages.map((msg: any) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  return {
    contents,
    generationConfig: {
      maxOutputTokens: request.max_tokens,
      temperature: request.temperature,
      topP: request.top_p,
    },
  };
}

/**
 * Google Gemini chunk to OpenAI-Compatible SSE format
 */
export function mapGeminiChunkToOpenAi(chunk: any, model: string) {
  const text = chunk.text();
  
  return {
    id: `chatcmpl-${Math.random().toString(36).slice(2)}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model: model,
    choices: [
      {
        index: 0,
        delta: { content: text },
        finish_reason: null,
      },
    ],
  };
}
