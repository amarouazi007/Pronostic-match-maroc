import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface Prediction {
  id: string;
  userName: string;
  moroccoScore: number;
  scotlandScore: number;
  scorer: string;
  comment: string;
  createdAt: string;
}

const PREDICTIONS_FILE = path.join(process.cwd(), "predictions.json");

// Intial dataset to make the app alive from takeoff
const defaultPredictions: Prediction[] = [
  {
    id: "pred-1",
    userName: "Youssef",
    moroccoScore: 2,
    scotlandScore: 1,
    scorer: "Brahim Díaz (Ailier)",
    comment: "DIMA MAGHRIB ! Les Lions vont rugir aujourd'hui !",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "pred-2",
    userName: "Fiona",
    moroccoScore: 1,
    scotlandScore: 2,
    scorer: "Scott McTominay (Milieu)",
    comment: "Come on Scotland! A tough game but McTominay will find a way.",
    createdAt: new Date(Date.now() - 3600000 * 3.5).toISOString(),
  },
  {
    id: "pred-3",
    userName: "Amine",
    moroccoScore: 3,
    scotlandScore: 0,
    scorer: "Ayoub El Kaabi (Attaquant)",
    comment: "Victoire écrasante de notre équipe nationale, El Kaabi dans l'histoire !",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: "pred-4",
    userName: "Sarah",
    moroccoScore: 2,
    scotlandScore: 0,
    scorer: "Achraf Hakimi (Défenseur droit)",
    comment: "Hakimi sur coup franc ! Match solide en défense.",
    createdAt: new Date(Date.now() - 3600000 * 2.5).toISOString(),
  },
  {
    id: "pred-5",
    userName: "Hamza",
    moroccoScore: 1,
    scotlandScore: 1,
    scorer: "Ismael Saibari (Attaquant/Milieu)",
    comment: "Match nul très tendu, l'Écosse a un collectif solide. Combat de titans !",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "pred-6",
    userName: "Khadija",
    moroccoScore: 2,
    scotlandScore: 1,
    scorer: "Brahim Díaz (Ailier)",
    comment: "Brahim Díaz va débloquer la rencontre en seconde période !",
    createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
  },
  {
    id: "pred-7",
    userName: "Callum",
    moroccoScore: 0,
    scotlandScore: 0,
    scorer: "Autre / Pas de buteur",
    comment: "A tactical chess match. Scotland stays compact.",
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  }
];

// Helper to load predictions
function loadPredictions(): Prediction[] {
  try {
    if (fs.existsSync(PREDICTIONS_FILE)) {
      const data = fs.readFileSync(PREDICTIONS_FILE, "utf-8");
      return JSON.parse(data);
    } else {
      // Write defaults
      fs.writeFileSync(PREDICTIONS_FILE, JSON.stringify(defaultPredictions, null, 2));
      return defaultPredictions;
    }
  } catch (error) {
    console.error("Error loaded predictions:", error);
    return defaultPredictions;
  }
}

// Helper to save predictions
function savePredictions(predictions: Prediction[]) {
  try {
    fs.writeFileSync(PREDICTIONS_FILE, JSON.stringify(predictions, null, 2));
  } catch (error) {
    console.error("Error saving predictions:", error);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());

  // API Routes
  app.get("/api/predictions", (req, res) => {
    try {
      const preds = loadPredictions();
      res.json(preds);
    } catch (err) {
      res.status(500).json({ error: "Failed to load predictions" });
    }
  });

  app.post("/api/predictions", (req, res) => {
    try {
      const { userName, moroccoScore, scotlandScore, scorer, comment } = req.body;

      // Validation
      if (!userName || typeof userName !== "string" || userName.trim() === "") {
        return res.status(400).json({ error: "Le nom d'utilisateur est requis." });
      }

      if (
        moroccoScore === undefined || 
        scotlandScore === undefined || 
        isNaN(Number(moroccoScore)) || 
        isNaN(Number(scotlandScore))
      ) {
        return res.status(400).json({ error: "Les scores doivent être des nombres valides." });
      }

      const predictions = loadPredictions();
      const newPrediction: Prediction = {
        id: "pred-" + Math.random().toString(36).substr(2, 9),
        userName: userName.substring(0, 50),
        moroccoScore: Math.min(Math.max(parseInt(moroccoScore, 10), 0), 20),
        scotlandScore: Math.min(Math.max(parseInt(scotlandScore, 10), 0), 20),
        scorer: typeof scorer === "string" ? scorer.substring(0, 100) : "Autre / Pas de buteur",
        comment: typeof comment === "string" ? comment.substring(0, 500) : "",
        createdAt: new Date().toISOString(),
      };

      predictions.push(newPrediction);
      savePredictions(predictions);

      res.status(201).json(newPrediction);
    } catch (err) {
      res.status(500).json({ error: "Failed to post prediction" });
    }
  });

  // Client fallback / Dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for SPA routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
