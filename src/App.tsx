import React, { useState, useEffect, useMemo } from "react";
import { 
  Trophy, 
  Users, 
  Share2, 
  Send, 
  TrendingUp, 
  Plus, 
  Minus, 
  Clock, 
  Sparkles, 
  Smile, 
  MessageSquare, 
  Search,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Prediction, MatchStats, MOROCCO_PLAYERS, SCOTLAND_PLAYERS } from "./types";
import Mag5starsLogo from "./components/Mag5starsLogo";
import { MoroccoFlag, ScotlandFlag } from "./components/Flags";

const LION_IMAGE_URL = "/src/assets/images/atlas_lion_victory_1781898346077.jpg";

const TRANSLATIONS = {
  fr: {
    chooseLanguage: "Choisir langue",
    matchCountdown: "COMPTE À REBOURS DU MATCH",
    worldCup: "COUPE DU MONDE 2026",
    matchToday: "COMMENCEMENT AUJOURD'HUI À 23:00 (GMT+1)",
    matchTomorrow: "COMMENCEMENT DEMAIN À 23:00 (GMT+1)",
    hours: "HEURES",
    minutes: "MINUTES",
    seconds: "SECONDES",
    matchWarmup: "MATCH S'ÉCHAUFFE !",
    title: "Maroc vs Écosse",
    subtitle: "Donnez votre pronostic officiel de la Coupe du Monde 2026",
    favoriTitle: "Qui est le plus favori ?",
    favoriSub: "Distribution des votes du groupe pour la victoire finale.",
    noStats: "Aucune statistique disponible pour le moment. Soyez le premier ami à voter !",
    moroccoGauge: "Pour le Maroc",
    moroccoWinner: "Maroc vainqueur",
    draw: "Match Nul",
    scotlandWinner: "Écosse vainqueur",
    predictedGoals: "Moyenne des buts prévus",
    goalsPerMatch: "Buts / match",
    popularScore: "Score le plus populaire :",
    vs: "vs",
    whatsappGroupTitle: "Groupe WhatsApp",
    whatsappGroupSub: "Partagez instantanément ces statistiques et invitez vos amis à faire leur propre pronostic !",
    whatsappGroupBtn: "PARTAGER LE LIEN SUR WHATSAPP",
    yourPrediction: "Votre Pronostic !",
    vote: "Voter",
    friendNameLabel: "Votre nom d'ami(e)",
    friendNamePlaceholder: "Ex: Amine, Sophia, Hamza...",
    friendNameSub: "Sera affiché publiquement sur le mur des pronostics.",
    scoreSelectorTitle: "Score prévu du match",
    buteurTitle: "Buteur vedette du match",
    marocLions: "🇲🇦 Maroc Lions",
    scotlandTeam: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Écosse",
    commentLabel: "Encouragement / Commentaire",
    commentPlaceholder: "Ajoutez un message sympa ou une taquinerie d'ami...",
    errorEmptyName: "Veuillez saisir votre nom d'ami.",
    successTitle: "Pronostic enregistré avec succès !",
    successSub: "Il apparaît désormais sur le mur en temps réel.",
    saving: "ENREGISTREMENT...",
    submitBtn: "PARTICIPER ET ENVOYER",
    murTitle: "Le Mur des Amis",
    murVotesCount: "pronostics enregistrés",
    searchFriend: "Chercher un ami...",
    tabAll: "Tous",
    tabWinMaroc: "🇲🇦 Gagne",
    tabNul: "🤝 Nul",
    tabWinScotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Gagne",
    loadingVotes: "Chargement des votes...",
    noPredictions: "Aucun pronostic trouvé.",
    inviteFriends: "Partagez l'application pour solliciter vos amis !",
    createdAtFormat: "fr-FR",
    individualPronostic: "Pronostic :",
    individualButeur: "Buteur :",
    individualShare: "Partager",
    linkGenerated: "Lien WhatsApp généré !",
    envoiEncours: "Envoi en cours sur votre application WhatsApp...",
    footerLogoSub: "Le Roi de l'Atlas • Marouazi Édition",
    footerSlogan: "BONNE CHANCE POUR LES LIONS DE L'ATLAS ! 🦁🇲🇦",
    footerCommunityMsg: "Toute la communauté se rassemble pour soutenir notre onze national contre l'Écosse aujourd'hui. Faisons briller la Mag5stars !",
    footerCreatedBy: "Réalisé par",
    footerAllRightsReserved: "Tous droits réservés.",
    footerCloudRun: "Déployé sur plate-forme haute performance cloud run",
    winnerStatusMaroc: "Maroc",
    winnerStatusNul: "Nul",
    winnerStatusScotland: "Écosse",
    maroc: "MAROC",
    ecosse: "ÉCOSSE"
  },
  ar: {
    chooseLanguage: "اختر اللغة",
    matchCountdown: "العد التنازلي للمباراة",
    worldCup: "كأس العالم 2026",
    matchToday: "بدء المباراة اليوم في الساعة 23:00 (جرينتش+1)",
    matchTomorrow: "بدء المباراة غداً في الساعة 23:00 (جرينتش+1)",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",
    matchWarmup: "بدأت الإحماءات !",
    title: "المغرب ضد إسكتلندا",
    subtitle: "قدم توقعك الرسمي لكأس العالم 2026",
    favoriTitle: "من هو الأكثر تفضيلاً ؟",
    favoriSub: "توزيع أصوات المجموعة للفوز النهائي للمباراة.",
    noStats: "لا توجد إحصائيات متوفرة حالياً. كن أول صديق يصوت !",
    moroccoGauge: "لصالح المغرب",
    moroccoWinner: "فوز المغرب",
    draw: "تعادل",
    scotlandWinner: "فوز إسكتلندا",
    predictedGoals: "متوسط الأهداف المتوقعة",
    goalsPerMatch: "أهداف / مباراة",
    popularScore: "النتيجة الأكثر توقعاً :",
    vs: "ضد",
    whatsappGroupTitle: "مجموعة الواتساب",
    whatsappGroupSub: "شارك هذه الإحصائيات فوراً وادعُ أصدقاءك لتقديم توقعاتهم الخاصة!",
    whatsappGroupBtn: "مشاركة الرابط على واتساب",
    yourPrediction: "توقعك الخاص !",
    vote: "تصويت",
    friendNameLabel: "اسمك (صديق/صديقة)",
    friendNamePlaceholder: "مثال: أمين، صوفيا، حمزة...",
    friendNameSub: "سيتم عرضه علنًا على جدار التوقعات.",
    scoreSelectorTitle: "النتيجة المتوقعة للمباراة",
    buteurTitle: "نجم المباراة ومسجل الهدف",
    marocLions: "🇲🇦 أسود المغرب",
    scotlandTeam: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 إسكتلندا",
    commentLabel: "تشجيع / تعليق",
    commentPlaceholder: "أضف رسالة لطيفة أو تعليقاً ودياً مع الأصدقاء...",
    errorEmptyName: "يرجى إدخال اسمك أولاً.",
    successTitle: "تم تسجيل توقعك بنجاح !",
    successSub: "يظهر الآن على الجدار في الوقت الفعلي.",
    saving: "جاري التسجيل...",
    submitBtn: "المشاركة والإرسال",
    murTitle: "جدار الأصدقاء",
    murVotesCount: "توقعات مسجلة",
    searchFriend: "ابحث عن صديق...",
    tabAll: "الكل",
    tabWinMaroc: "🇲🇦 فوز",
    tabNul: "🤝 تعادل",
    tabWinScotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 فوز",
    loadingVotes: "جاري تحميل الأصوات...",
    noPredictions: "لم يتم العثور على أي توقع.",
    inviteFriends: "شارك التطبيق لدعوة أصدقائك وجمع الأصوات !",
    createdAtFormat: "ar-SA",
    individualPronostic: "التوقع :",
    individualButeur: "مسجل الهدف :",
    individualShare: "مشاركة",
    linkGenerated: "تم إنشاء رابط الواتساب!",
    envoiEncours: "جاري تحويلك إلى تطبيق واتساب الخاص بك...",
    footerLogoSub: "أسد الأطلس • إصدار المرواني",
    footerSlogan: "بالتوفيق لأسود الأطلس! 🦁🇲🇦",
    footerCommunityMsg: "يجتمع المجتمع بأكمله اليوم لدعم منتخبنا الوطني ضد إسكتلندا. دعونا نجعل Mag5stars تتألق ونكتسح التوقعات!",
    footerCreatedBy: "تم التطوير بواسطة",
    footerAllRightsReserved: "جميع الحقوق محفوظة.",
    footerCloudRun: "منشور على منصة سحابية عالية الأداء كلاود ران",
    winnerStatusMaroc: "المغرب",
    winnerStatusNul: "تعادل",
    winnerStatusScotland: "إسكتلندا",
    maroc: "المغرب",
    ecosse: "إسكتلندا"
  }
};

const translatePlayer = (name: string, locale: "fr" | "ar") => {
  if (locale === "fr") return name;
  const dict: Record<string, string> = {
    "Brahim Díaz (Ailier)": "إبراهيم دياز (جناح)",
    "Ismael Saibari (Attaquant/Milieu)": "إسماعيل صيباري (مهاجم/وسط)",
    "Ayoub El Kaabi (Attaquant)": "أيوب الكعبي (مهاجم)",
    "Bilal El Khannouss (Ailier)": "بلال الخنوس (جناح)",
    "Azzedine Ounahi (Milieu Off.)": "عز الدين أوناحي (وسط هجومي)",
    "Ayyoub Bouaddi (Milieu)": "أيرب بوعدي (خط وسط)",
    "Neil El Aynaoui (Milieu)": "نائل العيناوي (خط وسط)",
    "Achraf Hakimi (Défenseur droit)": "أشرف حكيمي (ظهير أيمن)",
    "Noussair Mazraoui (Défenseur gauche)": "نصير مزراوي (ظهير أيسر)",
    "Chadi Riad (Défenseur central)": "شادي رياض (مدافع أوسط)",
    "Issa Diop (Défenseur central)": "عيسى ديوب (مدافع أوسط)",
    "Autre / Pas de buteur": "آخر / لا يوجد مسجل هدف",
    
    "Lawrence Shankland (Attaquant)": "لورينس شانكلاند (مهاجم)",
    "Che Adams (Attaquant)": "تشي آدامز (مهاجم)",
    "Scott McTominay (Milieu)": "سكوت مكتوميناي (خط وسط)",
    "John McGinn (Milieu)": "جون مكجين (خط وسط)",
    "Ben Gannon-Doak (Milieu/Ailier)": "بين غانون دوك (جناح/وسط)",
    "Lewis Ferguson (Milieu)": "لويس فيرجسون (خط وسط)",
    "Andy Robertson (Défenseur gauche)": "أندي روبرتسون (ظهير أيسر)",
    "Aaron Hickey (Défenseur droit)": "آرون هيكي (ظهير أيمن)",
    "Grant Hanley (Défenseur central)": "جرانت هانلي (مدافع أوسط)",
    "Jack Hendry (Défenseur central)": "جاك هيندري (مدافع أوسط)"
  };
  return dict[name] || name;
};

export default function App() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [userName, setUserName] = useState("");
  const [moroccoScore, setMoroccoScore] = useState(2);
  const [scotlandScore, setScotlandScore] = useState(1);
  const [scorer, setScorer] = useState("Brahim Díaz (Ailier)");
  const [comment, setComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [locale, setLocale] = useState<"fr" | "ar">("fr");
  
  // UI states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [voted, setVoted] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "morocco" | "scotland" | "draw">("all");

  // Countdown timer toward kickoff today at 23:00 (11:00 PM)
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    isMatchOngoing: boolean;
    labelKey: "matchToday" | "matchTomorrow";
  }>({
    hours: 10,
    minutes: 0,
    seconds: 0,
    isMatchOngoing: false,
    labelKey: "matchToday"
  });

  // Calculate countdown dynamic behavior based on current local time
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      
      // Target is June 19, 2026 at 23:00:00 (local timezone/GMT+1)
      // Using solid cross-browser safe Date constructor to avoid Safari NaN rendering bugs
      let kickoff = new Date(2026, 5, 19, 23, 0, 0); 
      let difference = kickoff.getTime() - now.getTime();
      let labelKey: "matchToday" | "matchTomorrow" = "matchToday";

      // If kickoff is passed, keep the countdown ticking towards tomorrow's matches/continuation
      if (difference <= 0) {
        kickoff = new Date(2026, 5, 20, 23, 0, 0); // set to tomorrow
        difference = kickoff.getTime() - now.getTime();
        labelKey = "matchTomorrow";
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds, isMatchOngoing: false, labelKey });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch predictions from full-stack database
  const fetchPredictions = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/predictions");
      if (res.ok) {
        const data = await res.json();
        setPredictions(data);
      }
    } catch (err) {
      console.error("Error fetching predictions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  // Preset phrases for easy tapping dependent on locale
  const presetComments = useMemo(() => {
    return locale === "fr"
      ? [
          "DIMA MAGHRIB ! 🇲🇦🦁",
          "Les Lions vont rugir ! 👑",
          "Match très intense en perspective ⚽",
          "On va dominer l'Écosse ! 🔥",
          "Solide en défense, redoutable en attaque !",
        ]
      : [
          "ديما مغرب ! 🇲🇦🦁",
          "زئير الأسود سينطلق ! 👑",
          "مباراة نارية حاسمة في الانتظار ⚽",
          "سنفوز اليوم على إسكتلندا ! 🔥",
          "دفاع حديدي وهجوم فتاك !",
        ];
  }, [locale]);

  const handlePresetCommentClick = (preset: string) => {
    if (comment.trim() === "") {
      setComment(preset);
    } else {
      setComment(prev => prev + " " + preset);
    }
  };

  // Submit prediction
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    if (!userName.trim()) {
      setFormError("Veuillez saisir votre nom d'ami.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName.trim(),
          moroccoScore,
          scotlandScore,
          scorer,
          comment: comment.trim()
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Une erreur est survenue.");
      }

      const newPred = await response.json();
      setPredictions(prev => [newPred, ...prev]);
      setFormSuccess(true);
      setVoted(true);
      setComment(""); // Reset comment
      
      // Auto dismiss success window after 4s
      setTimeout(() => setFormSuccess(false), 4000);
    } catch (err: any) {
      setFormError(err.message || "Erreur de connexion avec le serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-adjust suggested score goalscorer list depending on score
  useEffect(() => {
    if (moroccoScore > scotlandScore) {
      if (!MOROCCO_PLAYERS.includes(scorer)) {
        setScorer(MOROCCO_PLAYERS[0]);
      }
    } else if (scotlandScore > moroccoScore) {
      if (!SCOTLAND_PLAYERS.includes(scorer)) {
        setScorer(SCOTLAND_PLAYERS[0]);
      }
    }
  }, [moroccoScore, scotlandScore]);

  // Aggregate dynamic metrics from loaded predictions
  const stats: MatchStats = useMemo(() => {
    const total = predictions.length;
    if (total === 0) {
      return {
        moroccoWinPct: 60,
        scotlandWinPct: 20,
        drawPct: 20,
        totalVotes: 0,
        avgMoroccoScore: 2,
        avgScotlandScore: 1,
        mostPredictedScore: "2 - 1"
      };
    }

    let moroccoWins = 0;
    let scotlandWins = 0;
    let draws = 0;
    let totalMoroccoGoals = 0;
    let totalScotlandGoals = 0;
    const scoreMap: Record<string, number> = {};

    predictions.forEach(p => {
      totalMoroccoGoals += p.moroccoScore;
      totalScotlandGoals += p.scotlandScore;

      if (p.moroccoScore > p.scotlandScore) {
        moroccoWins++;
      } else if (p.scotlandScore > p.moroccoScore) {
        scotlandWins++;
      } else {
        draws++;
      }

      const scoreKey = `${p.moroccoScore} - ${p.scotlandScore}`;
      scoreMap[scoreKey] = (scoreMap[scoreKey] || 0) + 1;
    });

    // Find most common scoreline
    let maxVotes = 0;
    let commonScore = "2 - 1";
    Object.entries(scoreMap).forEach(([score, votes]) => {
      if (votes > maxVotes) {
        maxVotes = votes;
        commonScore = score;
      }
    });

    return {
      moroccoWinPct: Math.round((moroccoWins / total) * 100),
      scotlandWinPct: Math.round((scotlandWins / total) * 100),
      drawPct: Math.round((draws / total) * 100),
      totalVotes: total,
      avgMoroccoScore: parseFloat((totalMoroccoGoals / total).toFixed(1)),
      avgScotlandScore: parseFloat((totalScotlandGoals / total).toFixed(1)),
      mostPredictedScore: commonScore
    };
  }, [predictions]);

  // Favorite scorer stats
  const scorerStats = useMemo(() => {
    const counts: Record<string, number> = {};
    predictions.forEach(p => {
      if (p.scorer && p.scorer !== "Autre / Pas de buteur") {
        counts[p.scorer] = (counts[p.scorer] || 0) + 1;
      }
    });

    const data = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    if (data.length === 0) {
      return [{ name: "Brahim Díaz (Ailier)", count: 4 }, { name: "Ayoub El Kaabi (Attaquant)", count: 2 }];
    }
    return data;
  }, [predictions]);

  // Filters and queries
  const filteredPredictions = useMemo(() => {
    return predictions.filter(p => {
      const matchSearch = p.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.scorer.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === "all") return matchSearch;
      if (activeTab === "morocco") return matchSearch && (p.moroccoScore > p.scotlandScore);
      if (activeTab === "scotland") return matchSearch && (p.scotlandScore > p.moroccoScore);
      if (activeTab === "draw") return matchSearch && (p.moroccoScore === p.scotlandScore);
      
      return matchSearch;
    });
  }, [predictions, searchQuery, activeTab]);

  // Handle predictions distribution chart
  const scoresChartData = useMemo(() => {
    const counts: Record<string, number> = {
      "Maroc Gagne": 0,
      "Match Nul": 0,
      "Écosse Gagne": 0
    };

    predictions.forEach(p => {
      if (p.moroccoScore > p.scotlandScore) {
        counts["Maroc Gagne"]++;
      } else if (p.scotlandScore > p.moroccoScore) {
        counts["Écosse Gagne"]++;
      } else {
        counts["Match Nul"]++;
      }
    });

    return [
      { name: locale === "fr" ? "Victoire Maroc 🇲🇦" : "فوز المغرب 🇲🇦", valeur: counts["Maroc Gagne"], color: "#ef4444" },
      { name: locale === "fr" ? "Match Nul 🤝" : "تعادل 🤝", valeur: counts["Match Nul"], color: "#f59e0b" },
      { name: locale === "fr" ? "Victoire Écosse 🏴󠁧󠁢󠁳󠁣󠁴󠁿" : "فوز إسكتلندا 🏴󠁧󠁢󠁳󠁣󠁴󠁿", valeur: counts["Écosse Gagne"], color: "#3b82f6" }
    ];
  }, [predictions, locale]);

  // WHATSAPP SHARING
  const handleShareGroup = () => {
    const textStr = locale === "fr"
      ? encodeURIComponent(
          `🏆 Pronostics Coupe du Monde 2026 : MAROC 🇲🇦 vs ÉCOSSE 🏴󠁧󠁢󠁳󠁣󠁴󠁿 !\n\n` +
          `💡 Stats actuelles du groupe Mag5stars :\n` +
          `🇲🇦 Maroc : ${stats.moroccoWinPct}%\n` +
          `🤝 Nul : ${stats.drawPct}%\n` +
          `🏴󠁧󠁢󠁳󠁣󠁴󠁿 Écosse : ${stats.scotlandWinPct}%\n` +
          `⚽ Score le plus voté : Maroc ${stats.mostPredictedScore} Écosse\n\n` +
          `🔗 Viens voter et donner ton pronostic ici : ${window.location.href}`
        )
      : encodeURIComponent(
          `🏆 توقعات كأس العالم 2026 : المغرب 🇲🇦 ضد إسكتلندا 🏴󠁧󠁢󠁳󠁣󠁴󠁿 !\n\n` +
          `💡 إحصائيات مجموعة Mag5stars الحالية :\n` +
          `🇲🇦 المغرب : ${stats.moroccoWinPct}%\n` +
          `🤝 تعادل : ${stats.drawPct}%\n` +
          `🏴󠁧󠁢󠁳󠁣󠁴󠁿 إسكتلندا : ${stats.scotlandWinPct}%\n` +
          `⚽ النتيجة الأكثر توقعاً : المغرب ${stats.mostPredictedScore} إسكتلندا\n\n` +
          `🔗 ادخل وصوت وسجل توقعك هنا : ${window.location.href}`
        );
    window.open(`https://api.whatsapp.com/send?text=${textStr}`, "_blank");
  };

  const handleShareIndividual = (p: Prediction, index: number) => {
    const textStr = locale === "fr"
      ? encodeURIComponent(
          `⚽ Mon pronostic pour Maroc 🇲🇦 vs Écosse 🏴󠁧󠁢󠁳󠁣󠁴󠁿 :\n` +
          `👉 Maroc ${p.moroccoScore} - ${p.scotlandScore} Écosse\n` +
          `🎯 Buteur : ${p.scorer}\n` +
          `📝 "${p.comment || "Pas de commentaire"}"\n\n` +
          `🏆 Vote toi aussi sur le site Mag5stars : ${window.location.href}`
        )
      : encodeURIComponent(
          `⚽ توقعي لمباراة المغرب 🇲🇦 ضد إسكتلندا 🏴󠁧󠁢󠁳󠁣󠁴󠁿 :\n` +
          `👉 المغرب ${p.moroccoScore} - ${p.scotlandScore} إسكتلندا\n` +
          `🎯 مسجل الهدف : ${translatePlayer(p.scorer, "ar")}\n` +
          `📝 "${p.comment || "بدون تعليق"}"\n\n` +
          `🏆 شارك توقعك أنت أيضاً على موقع Mag5stars : ${window.location.href}`
        );
    window.open(`https://api.whatsapp.com/send?text=${textStr}`, "_blank");

    // Copied feedback
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const t = TRANSLATIONS[locale];

  return (
    <div 
      dir={locale === "ar" ? "rtl" : "ltr"} 
      className="relative min-h-screen bg-[#060814] text-white font-sans antialiased overflow-x-hidden selection:bg-red-500 selection:text-white" 
      id="main-root-container"
    >
      
      {/* LANGUAGE SELECTOR BAR AT THE VERY TOP */}
      <div className="relative z-50 bg-[#0c1026]/90 border-b border-white/10 py-2.5 px-4 sticky top-0 backdrop-blur-md" id="language-selector-bar">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
            <span>🌐</span>
            <span>{t.chooseLanguage}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocale("fr")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer outline-none transition-all ${locale === "fr" ? "bg-red-600/20 text-red-400 border border-red-500/30" : "text-gray-400 hover:text-white border border-transparent"}`}
            >
              <span>🇫🇷</span>
              <span>Français</span>
            </button>
            <button
              onClick={() => setLocale("ar")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer outline-none transition-all ${locale === "ar" ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30" : "text-gray-400 hover:text-white border border-transparent"}`}
            >
              <span>🇲🇦</span>
              <span>العربية</span>
            </button>
          </div>
        </div>
      </div>

      {/* BACKGROUND GRAPHIC FILIGRANE WITH WATERMARK STADIUM VIDEO */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" id="background-watermark-overlay">
        {/* Dark radial center overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060814] via-[#091026]/95 to-[#060814] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-[#060814]/100 to-[#060814] z-10" />
        
        {/* Slow moving light lines */}
        <div className="absolute inset-x-0 top-1/4 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent blur-md" />
        <div className="absolute inset-x-0 bottom-1/3 h-1 bg-gradient-to-r from-transparent via-red-500/15 to-transparent blur-md" />

        {/* Beautiful Watermark image of Brahim Díaz and Hakimi (filigrane) in action */}
        <div className="absolute inset-0 z-5 opacity-[0.14] mix-blend-screen">
          <img 
            src="/src/assets/images/brahim_hakimi_watermark_1781900711085.jpg" 
            alt="Brahim Díaz & Achraf Hakimi Watermark" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Floating Rotating HUGE Watermark of Mag5stars Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none scale-[3.2] transform rotate-12 animate-[spin_120s_linear_infinite]" id="rotating-watermark-logo">
          <svg viewBox="0 0 400 400" className="w-96 h-96">
            <circle cx="200" cy="200" r="190" fill="none" stroke="#ffffff" strokeWidth="8" />
            <circle cx="200" cy="200" r="162" fill="none" stroke="#ffffff" strokeWidth="4" />
            <circle cx="200" cy="200" r="130" fill="none" stroke="#ffffff" strokeWidth="2" />
            <text x="200" y="150" fill="#ffffff" fontWeight="bold" fontSize="48" textAnchor="middle">MAG</text>
            <text x="200" y="320" fill="#ffffff" fontWeight="bold" fontSize="30" textAnchor="middle">5 STARS</text>
            <text x="200" y="255" fill="#ffffff" fontWeight="bold" fontSize="110" textAnchor="middle">5</text>
          </svg>
        </div>

        {/* Looped Ambient Atmosphere Watermark Video */}
        <video 
          className="w-full h-full object-cover opacity-[0.07] scale-105"
          autoPlay 
          muted 
          loop 
          playsInline
          referrerPolicy="no-referrer"
          id="stadium-loops-watermark-video"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-sports-stadium-lights-and-atmosphere-34419-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* HEADER SECTION WITH MAG5STARS BRANDING */}
      <header className="relative z-20 w-full pt-10 pb-6 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center border-b border-white/5" id="header-mag5stars">
        
        {/* Mag5stars Interactive Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center"
          id="logo-animation-wrapper"
        >
          <Mag5starsLogo size={140} className="mb-2" />
          <div className="mt-1 flex items-center justify-center gap-1.5 px-3 py-1 bg-red-600/10 border border-red-500/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] tracking-widest font-mono text-red-400 uppercase font-semibold">
              Mag5stars Live Experience
            </span>
          </div>
        </motion.div>

        {/* Main Title Banner */}
        <div className="text-center mt-6 max-w-3xl px-4" id="title-text-group">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-sky-400">
            {t.title}
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-2 font-light">
            {t.subtitle}
          </p>
        </div>

        {/* MATCH DETAILS & LIVE COUNTDOWN BAR */}
        <div className="w-full max-w-2xl mt-8 px-4" id="countdown-card">
          <div className="bg-[#0f142b]/80 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-600/10 text-red-500 border border-red-500/20 shadow-lg">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="text-[9px] md:text-[10px] bg-red-500/15 border border-red-500/30 text-red-400 font-mono font-bold px-2 py-0.5 rounded-md mb-1 inline-block uppercase tracking-wider animate-pulse">
                  ⌛ {t.matchCountdown}
                </span>
                <p className="text-xs text-gray-400 font-mono">{t.worldCup}</p>
                <p className="text-sm font-semibold text-gray-100">{t[timeLeft.labelKey]}</p>
              </div>
            </div>

            <div className="flex items-center gap-2" id="time-grid">
              {timeLeft.isMatchOngoing ? (
                <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                  <span className="text-xs font-bold text-emerald-300 tracking-wider uppercase font-mono">{t.matchWarmup}</span>
                </div>
              ) : (
                <>
                  <div className="text-center bg-[#070914] border border-white/5 rounded-xl px-3 py-2 w-16 shadow-inner">
                    <p className="text-xl font-bold font-mono tracking-tight text-red-500">{String(timeLeft.hours).padStart(2, "0")}</p>
                    <p className="text-[10px] text-gray-500 font-bold tracking-tight">{t.hours}</p>
                  </div>
                  <span className="text-xl font-mono text-gray-600">:</span>
                  <div className="text-center bg-[#070914] border border-white/5 rounded-xl px-3 py-2 w-16 shadow-inner">
                    <p className="text-xl font-bold font-mono tracking-tight text-white">{String(timeLeft.minutes).padStart(2, "0")}</p>
                    <p className="text-[10px] text-gray-500 font-bold tracking-tight">{t.minutes}</p>
                  </div>
                  <span className="text-xl font-mono text-gray-600">:</span>
                  <div className="text-center bg-[#070914] border border-white/5 rounded-xl px-3 py-2 w-16 shadow-inner">
                    <p className="text-xl font-bold font-mono tracking-tight text-sky-400">{String(timeLeft.seconds).padStart(2, "0")}</p>
                    <p className="text-[10px] text-gray-500 font-bold tracking-tight">{t.seconds}</p>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

      </header>

      {/* MAIN LAYOUT CONTAINER */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8" id="primary-dashboard-layout">
        
        {/* LEFT COLUMN: THE GRAPHICAL ANALYSIS ("LE PLUS AVANTAGEUX") */}
        <section className="lg:col-span-4 flex flex-col gap-6" id="dashboard-graphs-column">
          
          {/* STATS TITLE CARD */}
          <div className="bg-[#0b0e1a]/90 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden" id="match-advantage-card">
            <div className="absolute top-0 right-0 p-3 bg-red-600/10 rounded-bl-2xl border-l border-b border-white/5">
              <TrendingUp className="w-5 h-5 text-red-500" />
            </div>

            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 mb-1">
              {t.favoriTitle}
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              {t.favoriSub}
            </p>

            {/* GAUGE CHART OR PIE CHART */}
            <div className="flex flex-col items-center justify-center relative min-h-[220px]" id="odds-chart-container">
              {predictions.length === 0 ? (
                <div className="text-center text-gray-500 text-xs">{t.noStats}</div>
              ) : (
                <div className="w-full h-[220px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={scoresChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="valeur"
                        nameKey="name"
                      >
                        {scoresChartData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0b0e1a", borderColor: "rgba(255,255,255,0.1)", borderRadius: "10px" }}
                        itemStyle={{ color: "#fff", fontSize: "12px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Inside Text Gauge */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                    <p className="text-3xl font-extrabold font-mono tracking-tight text-red-500">{stats.moroccoWinPct}%</p>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold font-mono">{t.moroccoGauge}</p>
                  </div>
                </div>
              )}
            </div>

            {/* BAR METRICS LIST */}
            <div className="mt-4 flex flex-col gap-3" id="scores-progress-bars">
              
              {/* MOROCCO BAR */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 font-semibold text-red-400">
                    <span>🇲🇦</span> {t.moroccoWinner}
                  </span>
                  <span className="font-mono font-bold text-red-500">{stats.moroccoWinPct}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.moroccoWinPct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-red-600 to-rose-500" 
                  />
                </div>
              </div>

              {/* DRAW BAR */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 font-semibold text-amber-400">
                    <span>🤝</span> {t.draw}
                  </span>
                  <span className="font-mono font-bold text-amber-500">{stats.drawPct}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.drawPct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-amber-600 to-yellow-500" 
                  />
                </div>
              </div>

              {/* SCOTLAND BAR */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 font-semibold text-blue-400">
                    <span>🏴󠁧󠁢󠁳󠁣󠁴󠁿</span> {t.scotlandWinner}
                  </span>
                  <span className="font-mono font-bold text-blue-500">{stats.scotlandWinPct}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.scotlandWinPct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-sky-500" 
                  />
                </div>
              </div>

            </div>

          </div>

          {/* SECOND GRAPHIC: AVERAGE PREDICTED GOALS */}
          <div className="bg-[#0b0e1a]/90 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-md" id="predicted-averages-card">
            <h3 className="text-base font-bold tracking-tight mb-4 flex items-center gap-2">
              <Trophy className="w-4.5 h-4.5 text-rose-500" />
              {t.predictedGoals}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              
              {/* MOROCCO GOALS */}
              <div className="bg-[#060814] rounded-xl p-4 border border-white/5 text-center shadow-inner flex flex-col items-center justify-center">
                <div className="w-20 h-14 mb-3 rounded-lg overflow-hidden shadow-lg border border-red-500/20">
                  <MoroccoFlag className="w-full h-full object-cover" />
                </div>
                <div className="inline-flex py-1 px-3 mb-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-[11px] font-extrabold tracking-wide font-mono uppercase">
                  {t.maroc}
                </div>
                <p className="text-4xl font-extrabold font-mono tracking-tight text-red-500">
                  {stats.avgMoroccoScore}
                </p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-wider">{t.goalsPerMatch}</p>
              </div>

              {/* SCOTLAND GOALS */}
              <div className="bg-[#060814] rounded-xl p-4 border border-white/5 text-center shadow-inner flex flex-col items-center justify-center">
                <div className="w-20 h-14 mb-3 rounded-lg overflow-hidden shadow-lg border border-blue-500/20">
                  <ScotlandFlag className="w-full h-full object-cover" />
                </div>
                <div className="inline-flex py-1 px-3 mb-2 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full text-[11px] font-extrabold tracking-wide font-mono uppercase">
                  {t.ecosse}
                </div>
                <p className="text-4xl font-extrabold font-mono tracking-tight text-sky-400">
                  {stats.avgScotlandScore}
                </p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-wider">{t.goalsPerMatch}</p>
              </div>

            </div>

            <div className="mt-4 p-3 bg-[#0f142b]/50 border border-white/5 rounded-xl text-center">
              <p className="text-xs text-gray-400">
                {t.popularScore} <span className="font-extrabold text-white font-mono bg-red-600/10 border border-red-500/20 px-2 py-0.5 rounded-md ml-1 inline-block">{(locale === "fr" ? "Maroc" : "المغرب") + " " + stats.mostPredictedScore + " " + (locale === "fr" ? "Écosse" : "إسكتلندا")}</span>
              </p>
            </div>
          </div>

          {/* WHATSAPP GROUP INVITE CODE / LINK BUTTON */}
          <div className="bg-gradient-to-r from-emerald-950/40 to-[#0b0e1a] border border-emerald-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden" id="whatsapp-callout-panel">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Share2 className="w-24 h-24 text-emerald-400" />
            </div>
            
            <h3 className="text-sm font-bold tracking-tight text-emerald-400 flex items-center gap-1.5 uppercase font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              {t.whatsappGroupTitle}
            </h3>
            <p className="text-xs text-gray-400 mt-1 min-h-[32px]">
              {t.whatsappGroupSub}
            </p>

            <button
              onClick={handleShareGroup}
              className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg outline-none"
              id="whatsapp-share-group-btn"
            >
              <Share2 className="w-4 h-4" />
              {t.whatsappGroupBtn}
            </button> 
          </div>

        </section>

        {/* CENTER COLUMN: PREDICTION REGISTRATION FORM */}
        <section className="lg:col-span-5" id="prediction-form-column">
          
          <div className="bg-[#0b0e1a]/95 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative h-full flex flex-col justify-between" id="prediction-form-card">
            
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-6" id="prediction-form">
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-5">
                  <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-red-500 animate-bounce" />
                    {t.yourPrediction}
                  </h2>
                  <span className="text-[10px] text-gray-500 tracking-wider font-mono bg-white/5 px-2.5 py-1 rounded-md">{t.vote}</span>
                </div>

                {/* USER NAME FRIEND */}
                <div className="mb-5">
                  <label className="block text-xs uppercase tracking-wide text-gray-400 font-bold mb-2">
                    {t.friendNameLabel}
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={t.friendNamePlaceholder}
                    maxLength={30}
                    className="w-full bg-[#060814] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
                    id="user-name-input"
                  />
                  <p className="text-[10px] text-gray-500 mt-1.5 font-light">
                    {t.friendNameSub}
                  </p>
                </div>

                {/* THE SCORE SELECTOR MODULE */}
                <div className="mb-6 bg-[#060814] rounded-2xl p-4 border border-white/10 shadow-inner">
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-bold text-center mb-4">
                    {t.scoreSelectorTitle}
                  </p>

                  <div className="flex items-center justify-around gap-2" id="score-selection-controls">
                    
                    {/* MAROC */}
                    <div className="text-center flex flex-col items-center">
                      <div className="w-16 h-11 mb-2">
                        <MoroccoFlag className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-bold font-mono tracking-wider">{t.maroc}</span>
                      
                      {/* Controllers */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => setMoroccoScore(prev => Math.max(0, prev - 1))}
                          className="w-8 h-8 rounded-full bg-red-600/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all cursor-pointer outline-none"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-xl font-extrabold font-mono text-center text-red-500">{moroccoScore}</span>
                        <button
                          type="button"
                          onClick={() => setMoroccoScore(prev => Math.min(20, prev + 1))}
                          className="w-8 h-8 rounded-full bg-red-600/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all cursor-pointer outline-none"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <span className="text-2xl font-extrabold font-mono text-gray-600 self-center mt-6">{t.vs}</span>

                    {/* SCOTLAND */}
                    <div className="text-center flex flex-col items-center">
                      <div className="w-16 h-11 mb-2">
                        <ScotlandFlag className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-bold font-mono tracking-wider">{t.ecosse}</span>

                      {/* Controllers */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => setScotlandScore(prev => Math.max(0, prev - 1))}
                          className="w-8 h-8 rounded-full bg-blue-600/10 text-sky-400 border border-blue-500/20 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all cursor-pointer outline-none"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-xl font-extrabold font-mono text-center text-sky-400">{scotlandScore}</span>
                        <button
                          type="button"
                          onClick={() => setScotlandScore(prev => Math.min(20, prev + 1))}
                          className="w-8 h-8 rounded-full bg-blue-600/10 text-sky-400 border border-blue-500/20 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all cursor-pointer outline-none"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* PRED GOALSCORER */}
                <div className="mb-5">
                  <label className="block text-xs uppercase tracking-wide text-gray-400 font-bold mb-2">
                    {t.buteurTitle}
                  </label>
                  
                  <select
                    value={scorer}
                    onChange={(e) => setScorer(e.target.value)}
                    className="w-full bg-[#060814] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-all shadow-inner"
                    id="star-scorer-select"
                  >
                    <optgroup label={t.marocLions}>
                      {MOROCCO_PLAYERS.map(p => (
                        <option key={p} value={p}>{translatePlayer(p, locale)}</option>
                      ))}
                    </optgroup>
                    <optgroup label={t.scotlandTeam}>
                      {SCOTLAND_PLAYERS.map(p => (
                        <option key={p} value={p}>{translatePlayer(p, locale)}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* COMMENT INPUT */}
                <div className="mb-5">
                  <label className="block text-xs uppercase tracking-wide text-gray-400 font-bold mb-2">
                    {t.commentLabel}
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t.commentPlaceholder}
                    maxLength={300}
                    rows={3}
                    className="w-full bg-[#060814] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-all shadow-inner"
                    id="user-comment-textarea"
                  />

                  {/* Preset Buttons */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5" id="preset-pill-comments">
                    {presetComments.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePresetCommentClick(preset)}
                        className="text-[10px] font-medium bg-white/5 border border-white/5 hover:border-red-500/50 hover:bg-red-500/5 px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer outline-none"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* STATUS & FEEDBACK ERROR WIN / SUCCESS */}
              <div className="mt-2" id="form-error-or-success-messages">
                <AnimatePresence mode="wait">
                  {formError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-red-900/20 border border-red-500/30 rounded-xl flex items-center gap-2 mb-4"
                    >
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <p className="text-xs text-red-400">{formError}</p>
                    </motion.div>
                  )}

                  {formSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center gap-3 mb-4"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-emerald-400">{t.successTitle}</p>
                        <p className="text-[10px] text-gray-400">{t.successSub}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* FORM SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-extrabold text-sm tracking-wider rounded-xl hover:shadow-2xl hover:shadow-red-500/10 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer outline-none"
                  id="submit-prediction-btn"
                >
                  <Send className={`w-4 h-4 ${isSubmitting ? "animate-pulse" : ""}`} />
                  {isSubmitting ? t.saving : t.submitBtn}
                </button>
              </div>

            </form>

          </div>

        </section>

        {/* RIGHT COLUMN: PREDICTIONS STREAM & MUTUALS LIST */}
        <section className="lg:col-span-3 flex flex-col gap-6" id="predictions-stream-column">
          
          <div className="bg-[#0b0e1a]/95 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-md flex flex-col min-h-[500px]" id="predictions-stream-card">
            
            {/* COLUMN HEADER */}
            <div className="border-b border-white/5 pb-3 mb-4">
              <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-sky-400 animate-pulse" />
                {t.murTitle}
              </h2>
              <p className="text-[10px] text-gray-500 mt-1">
                {locale === "fr" ? "Total :" : "الإجمالي :"} <span className="font-bold text-sky-400 font-mono">{predictions.length}</span> {t.murVotesCount}
              </p>
            </div>

            {/* SEARCH & FILTER BAR */}
            <div className="relative mb-4 flex items-center" id="search-box">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder={t.searchFriend}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#060814] border border-white/5 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 transition-all font-sans"
              />
            </div>

            {/* FILTER PREDICTIONS QUICK TABS */}
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#060814] rounded-lg border border-white/5 mb-4" id="stream-filtering-tabs">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`py-1.5 text-[9px] font-bold uppercase rounded-md tracking-wider transition-all cursor-pointer text-center outline-none ${activeTab === "all" ? "bg-white/10 text-white shadow-sm" : "text-gray-500 hover:text-gray-400"}`}
              >
                {t.tabAll}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("morocco")}
                className={`py-1.5 text-[9px] font-bold uppercase rounded-md tracking-wider transition-all cursor-pointer text-center outline-none ${activeTab === "morocco" ? "bg-red-500/10 text-red-500 border border-red-500/15" : "text-gray-500 hover:text-gray-400"}`}
              >
                {t.tabWinMaroc}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("draw")}
                className={`py-1.5 text-[9px] font-bold uppercase rounded-md tracking-wider transition-all cursor-pointer text-center outline-none ${activeTab === "draw" ? "bg-amber-500/10 text-amber-500 border border-amber-500/15" : "text-gray-500 hover:text-gray-400"}`}
              >
                {t.tabNul}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("scotland")}
                className={`py-1.5 text-[9px] font-bold uppercase rounded-md tracking-wider transition-all cursor-pointer text-center outline-none ${activeTab === "scotland" ? "bg-blue-300/10 text-sky-400 border border-blue-500/15" : "text-gray-500 hover:text-gray-400"}`}
              >
                {t.tabWinScotland}
              </button>
            </div>

            {/* STREAM LIST CONTAINER */}
            <div className="flex-1 overflow-y-auto max-h-[380px] pr-1 flex flex-col gap-3 custom-scrollbar" id="submission-scrolling-view">
              {isLoading ? (
                <div className="my-auto py-12 text-center" id="predictions-loader">
                  <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-xs text-gray-500 font-mono">{t.loadingVotes}</p>
                </div>
              ) : filteredPredictions.length === 0 ? (
                <div className="my-auto py-12 text-center text-gray-600" id="empty-predictions-message">
                  <p className="text-xs italic">{t.noPredictions}</p>
                  <p className="text-[10px] mt-1 text-gray-700">{t.inviteFriends}</p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {filteredPredictions.map((p, idx) => {
                    const isMoroccoVoted = p.moroccoScore > p.scotlandScore;
                    const isScotlandVoted = p.scotlandScore > p.moroccoScore;
                    
                    return (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#060814] border border-white/5 hover:border-white/15 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 relative group"
                        id={`prediction-${p.id}`}
                      >
                        
                        {/* Stream item header (avatar + name) */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {/* Dynamic Soccer ball emblem depending on vote */}
                            <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center text-[10px] font-bold ${isMoroccoVoted ? "bg-red-500/10 text-red-500" : isScotlandVoted ? "bg-blue-500/10 text-blue-400" : "bg-amber-500/10 text-amber-500"}`}>
                              ⚽
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-200 select-none">{p.userName}</p>
                              <p className="text-[9px] text-gray-500 font-mono">
                                {new Date(p.createdAt).toLocaleDateString(t.createdAtFormat, {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>

                          {/* Share button hoverable */}
                          <button
                            onClick={() => handleShareIndividual(p, idx)}
                            className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 rounded-md opacity-40 group-hover:opacity-100 transition-all cursor-pointer select-none outline-none text-[10px] flex items-center gap-1"
                            title={locale === "fr" ? "Partager cette capture d'écran de vote" : "شارك هاته اللقطة"}
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            <span className="hidden group-hover:inline text-[9px] font-mono uppercase font-bold">{t.individualShare}</span>
                          </button>
                        </div>

                        {/* Predicted score representation */}
                        <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#0f142c]/50 rounded-lg border border-white/5 justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-gray-400">{t.individualPronostic}</span>
                            <span className="text-xs font-bold font-mono text-white bg-[#060814] px-1.5 py-0.5 rounded border border-white/5">
                              {p.moroccoScore} - {p.scotlandScore}
                            </span>
                          </div>

                          {/* Winner badge */}
                          <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${isMoroccoVoted ? "bg-red-500/10 text-red-500" : isScotlandVoted ? "bg-blue-500/10 text-sky-400" : "bg-amber-500/10 text-amber-500"}`}>
                            {isMoroccoVoted ? t.winnerStatusMaroc : isScotlandVoted ? t.winnerStatusScotland : t.winnerStatusNul}
                          </span>
                        </div>

                        {/* Selected Scorer badge */}
                        <div className="text-[10px] flex items-center gap-1.5 text-gray-400 font-mono">
                          <span className="text-amber-500">★</span>
                          <span>{t.individualButeur}</span>
                          <span className="text-gray-200 font-semibold">{translatePlayer(p.scorer, locale)}</span>
                        </div>

                        {/* Comment text block */}
                        {p.comment && (
                          <div className="text-[11px] text-gray-400 italic bg-white/[0.02] p-2 rounded border border-white/5">
                            "{p.comment}"
                          </div>
                        )}

                        {/* Sharing Copy Feedback */}
                        {copiedIndex === idx && (
                          <div className="absolute inset-0 bg-emerald-950/90 border border-emerald-500/30 rounded-xl flex flex-col items-center justify-center p-2 z-20 text-center backdrop-blur-sm animate-fade-in">
                            <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-1" />
                            <p className="text-xs font-bold text-emerald-400">{t.linkGenerated}</p>
                            <p className="text-[9px] text-gray-300 mt-0.5">{t.envoiEncours}</p>
                          </div>
                        )}

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            <div className="border-t border-white/5 pt-4 mt-3" id="stream-footer">
              <p className="text-[9px] text-gray-500 text-center font-mono leading-relaxed">
                {locale === "fr" 
                  ? "Connecté au service d'analyse Mag5stars. Les pronostics sont partagés en temps réel." 
                  : "متصل بخدمة تحليل Mag5stars الرائدة. يتم رصد وتبادل التوقعات مباشرة."}
              </p>
            </div>

          </div>

        </section>

      </main>

      {/* FOOTER WISH BANNER: BONNE CHANCE LES LIONS */}
      <footer className="relative z-20 mt-16 border-t border-white/10 overflow-hidden" id="lions-atlas-footer">
        
        {/* Glow behind the lion */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 py-16 text-center relative z-10 flex flex-col items-center">
          
          {/* LION IMAGE COMPONENT BORDER */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mb-8 rounded-3xl overflow-hidden border-2 border-red-500/40 p-1.5 shadow-2xl shrink-0 max-w-lg shadow-red-500/10 w-full"
            id="lion-frame"
          >
            <img 
              src={LION_IMAGE_URL} 
              alt={t.footerLionAlt} 
              className="rounded-2xl w-full h-[220px] md:h-[260px] object-cover hover:scale-105 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
              id="atlas-lion-banner-image"
            />
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 rounded-2xl pointer-events-none" />
            <div className="absolute bottom-5 inset-x-0 text-center">
              <span className="text-[10px] tracking-widest font-mono uppercase font-bold text-red-400 bg-red-950/80 border border-red-500/30 px-3 py-1 rounded-full">
                {t.footerLionBadge}
              </span>
            </div>
          </motion.div>

          {/* Sincere Encouragement Slogan */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center gap-2 mb-8"
            id="sincere-Atlas-slogan"
          >
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 select-none text-shadow-lg leading-normal">
              {t.footerWishTitle}
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1 max-w-xl font-light">
              {t.footerWishText}
            </p>
          </motion.div>

          {/* Small copyrights & Creator badge */}
          <div className="text-gray-600 text-[10px] font-mono mt-4 flex flex-col items-center gap-2 font-sans">
            <div className="px-5 py-2.5 bg-gradient-to-r from-red-600/10 to-emerald-600/10 border border-white/10 rounded-xl font-bold text-gray-200 text-center shadow-md text-xs tracking-wider select-none">
              {t.footerRealiseBy} <span className="text-red-500 font-extrabold">MAROUAZI ABDALLAH</span> — <span className="text-emerald-500 font-extrabold">{locale === "fr" ? "19 Juin 2026" : "19 يونيو 2026"}</span>
            </div>
            <p className="mt-1 font-mono">{t.footerCopyright}</p>
            <p className="text-[9px] hover:text-red-500 transition-all font-bold font-mono">{t.footerDeployed}</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
