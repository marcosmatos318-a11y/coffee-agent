import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { askAgent } from "./agentRunner";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

interface ChatRequestBody {
  userId?: string;
  question: string;
}

// Rota principal do chatbot
app.post("/chat", async (req: Request<{}, {}, ChatRequestBody>, res: Response) => {
  try {
    const { userId, question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({ error: "Campo 'question' é obrigatório." });
    }

    const answer = await askAgent(userId || "anon", question);
    return res.json({ answer });
  } catch (err: any) {
    console.error("Erro no /chat:", err?.message || err);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
});

// Rota simples para teste
app.get("/", (_req: Request, res: Response) => {
  res.send("Coffee-agent está rodando! Use POST /chat para falar com o bot.");
});

app.listen(PORT, () => {
  console.log(`☕ Coffee-agent ouvindo na porta ${PORT}`);
});
