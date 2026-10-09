import type { QuizQuestion } from "@/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which Indonesian island is famous for its traditional dances and temples?",
    options: ["Bali", "Sumatra", "Kalimantan", "Sulawesi"],
    correctIndex: 0,
    fact: "Bali is famous for its unique Hindu-influenced culture, thousands of temples, and traditional dances such as Legong and Kecak.",
    scene: "temple",
  },
  {
    id: "q2",
    question: "What is Indonesia's national motto, meaning “Unity in Diversity”?",
    options: ["Gotong Royong", "Bhinneka Tunggal Ika", "Merdeka", "Pancasila"],
    correctIndex: 1,
    fact: "“Bhinneka Tunggal Ika” is Old Javanese and appears on the national emblem, the Garuda Pancasila. Indonesia has more than 1,300 ethnic groups.",
    scene: "stupa",
  },
  {
    id: "q3",
    question: "Roughly how many islands make up Indonesia?",
    options: ["About 1,000", "About 7,000", "More than 17,000", "About 30,000"],
    correctIndex: 2,
    fact: "Indonesia is the world's largest archipelago, with over 17,000 islands stretching more than 5,000 km from east to west.",
    scene: "sea",
  },
  {
    id: "q4",
    question: "Which Indonesian textile art is recognised by UNESCO as Intangible Cultural Heritage?",
    options: ["Kimono", "Hanbok", "Sari", "Batik"],
    correctIndex: 3,
    fact: "Indonesian batik was inscribed by UNESCO in 2009. Its patterns are drawn with hot wax before dyeing, and many motifs carry symbolic meanings.",
    scene: "volcano",
  },
  {
    id: "q5",
    question: "Where can you see Komodo dragons, the world's largest lizards, in the wild?",
    options: ["Java", "Komodo National Park", "Sumatra", "Papua"],
    correctIndex: 1,
    fact: "Komodo National Park in East Nusa Tenggara protects the Komodo dragon, which can grow up to 3 metres long. It's also a UNESCO World Heritage Site.",
    scene: "savanna",
  },
];
