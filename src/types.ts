export interface Prediction {
  id: string;
  userName: string;
  moroccoScore: number;
  scotlandScore: number;
  scorer: string;
  comment: string;
  createdAt: string;
}

export interface MatchStats {
  moroccoWinPct: number;
  scotlandWinPct: number;
  drawPct: number;
  totalVotes: number;
  avgMoroccoScore: number;
  avgScotlandScore: number;
  mostPredictedScore: string;
}

export const MOROCCO_PLAYERS = [
  "Brahim Díaz (Ailier)",
  "Ismael Saibari (Attaquant/Milieu)",
  "Ayoub El Kaabi (Attaquant)",
  "Bilal El Khannouss (Ailier)",
  "Azzedine Ounahi (Milieu Off.)",
  "Ayyoub Bouaddi (Milieu)",
  "Neil El Aynaoui (Milieu)",
  "Achraf Hakimi (Défenseur droit)",
  "Noussair Mazraoui (Défenseur gauche)",
  "Chadi Riad (Défenseur central)",
  "Issa Diop (Défenseur central)",
  "Autre / Pas de buteur"
];

export const SCOTLAND_PLAYERS = [
  "Lawrence Shankland (Attaquant)",
  "Che Adams (Attaquant)",
  "Scott McTominay (Milieu)",
  "John McGinn (Milieu)",
  "Ben Gannon-Doak (Milieu/Ailier)",
  "Lewis Ferguson (Milieu)",
  "Andy Robertson (Défenseur gauche)",
  "Aaron Hickey (Défenseur droit)",
  "Grant Hanley (Défenseur central)",
  "Jack Hendry (Défenseur central)",
  "Autre / Pas de buteur"
];
