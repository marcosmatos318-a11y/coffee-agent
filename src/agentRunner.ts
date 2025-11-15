import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
Você é um especialista em cafés, métodos de preparo, máquinas de espresso, moinhos e suprimentos para uma loja virtual.
Regras:
- Responda sempre em português do Brasil.
- Explique de forma simples, organizada, em tom amigável.
- Quando fizer recomendações, pense como um vendedor consultivo de e-commerce (sem forçar venda).
- Se o usuário pedir algo fora do tema café/loja, responda brevemente e traga o foco de volta para café.
`;

export async function askAgent(userId: string, question: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini", // você pode trocar pelo modelo que tiver disponível
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `ID do usuário: ${userId}\nPergunta: ${question}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content ?? "";
  return content;
}
