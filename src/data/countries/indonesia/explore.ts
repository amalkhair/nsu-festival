import type { CultureItem, Destination, Souvenir } from "@/types";

export const culture: CultureItem[] = [
  {
    slug: "batik",
    name: "Batik",
    badge: "UNESCO 2009",
    summary: "Wax-resist dyed textiles with symbolic patterns",
    description:
      "Batik is made by drawing patterns onto cloth with hot wax using a small copper pen (canting), then dyeing it. Different regions have their own motifs, and some patterns were once reserved for royalty. Indonesians wear batik to school, work and celebrations, and 2 October is National Batik Day.",
  },
  {
    slug: "gamelan",
    name: "Gamelan",
    badge: "UNESCO 2021",
    summary: "Bronze percussion orchestras of Java and Bali",
    description:
      "A gamelan ensemble is built around gongs, metallophones and drums, played together in interlocking patterns. It accompanies dance, shadow puppetry and ceremonies, and each set of instruments is tuned as a unique whole.",
  },
  {
    slug: "wayang-kulit",
    name: "Wayang Kulit",
    badge: "UNESCO 2008",
    summary: "Shadow puppet theatre",
    description:
      "In wayang kulit, a single puppeteer (dalang) performs all night long, casting the shadows of intricate leather puppets onto a screen while narrating epic stories such as the Ramayana and Mahabharata, accompanied by gamelan.",
  },
  {
    slug: "saman",
    name: "Saman Dance",
    badge: "UNESCO 2011",
    summary: "The “dance of a thousand hands” from Aceh",
    description:
      "Saman is performed by a row of dancers kneeling shoulder to shoulder, clapping, slapping their chests and moving in perfectly synchronised waves that grow faster and faster, while singing in unison.",
  },
  {
    slug: "angklung",
    name: "Angklung",
    badge: "UNESCO 2010",
    summary: "Bamboo instruments from West Java",
    description:
      "Each angklung is a bamboo frame that plays a single note when shaken. A group plays melodies together, with every person responsible for their own notes, which makes it a symbol of cooperation.",
  },
  {
    slug: "pencak-silat",
    name: "Pencak Silat",
    badge: "UNESCO 2019",
    summary: "Traditional martial art",
    description:
      "Pencak silat combines self-defence, sport, art and spiritual training. Performances are graceful and often accompanied by music, and the art is practised across the Malay world.",
  },
];

export const destinations: Destination[] = [
  {
    slug: "bali",
    name: "Bali",
    summary: "Temples, beaches and unique culture",
    description:
      "The “Island of the Gods” is known for its Hindu temples, terraced rice fields, traditional dance and beautiful beaches. Ubud is the cultural heart of the island.",
    scene: "temple",
  },
  {
    slug: "yogyakarta",
    name: "Yogyakarta",
    summary: "History, art and world heritage sites",
    description:
      "Yogyakarta is a centre of Javanese culture and art, and the gateway to Borobudur, the world's largest Buddhist temple, and Prambanan, a magnificent Hindu temple complex.",
    scene: "stupa",
  },
  {
    slug: "komodo",
    name: "Komodo Island",
    summary: "Home of the legendary Komodo dragons",
    description:
      "Komodo National Park protects the Komodo dragon along with pink-sand beaches and rich coral reefs. It's a UNESCO World Heritage Site.",
    scene: "savanna",
  },
  {
    slug: "raja-ampat",
    name: "Raja Ampat",
    summary: "Stunning islands and marine life",
    description:
      "Raja Ampat in West Papua is made up of hundreds of karst islands and has some of the highest marine biodiversity on Earth, making it a paradise for divers.",
    scene: "sea",
  },
  {
    slug: "bromo",
    name: "Mount Bromo",
    summary: "Sunrise over an active volcano",
    description:
      "In East Java, visitors climb to viewpoints before dawn to watch the sun rise over Mount Bromo's smoking crater and the vast Sea of Sand.",
    scene: "volcano",
  },
  {
    slug: "lake-toba",
    name: "Lake Toba",
    summary: "The world's largest volcanic lake",
    description:
      "Lake Toba in North Sumatra fills an enormous supervolcano caldera. Samosir Island in its centre is home to the Batak people and their distinctive houses.",
    scene: "lake",
  },
];

export const souvenirs: Souvenir[] = [
  { id: "raja-ampat", title: "Raja Ampat", scene: "sea" },
  { id: "bali", title: "Bali Temple Gate", scene: "temple" },
  { id: "borobudur", title: "Borobudur", scene: "stupa" },
  { id: "bromo", title: "Mount Bromo", scene: "volcano" },
];
