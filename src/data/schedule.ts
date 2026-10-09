import type { ScheduleItem } from "@/types";

export const schedule: ScheduleItem[] = [
  // ── Saturday, Main Stage ──
  { id: "d1-01", day: "2027-05-24", start: "10:00", end: "10:30", title: "Opening Ceremony", stage: "main", scene: "festival" },
  { id: "d1-02", day: "2027-05-24", start: "10:30", end: "11:00", title: "Russian Folk Dance", stage: "main", country: "ru", scene: "stage" },
  { id: "d1-03", day: "2027-05-24", start: "11:00", end: "11:30", title: "Indonesian Traditional Dance", stage: "main", country: "id", scene: "temple" },
  { id: "d1-04", day: "2027-05-24", start: "11:30", end: "12:00", title: "Chinese Music Performance", stage: "main", country: "cn", scene: "palace" },
  { id: "d1-05", day: "2027-05-24", start: "12:00", end: "12:45", title: "Indian Classical Dance", stage: "main", country: "in", scene: "palace" },
  { id: "d1-06", day: "2027-05-24", start: "13:00", end: "13:45", title: "International Choir", stage: "main", scene: "stage" },
  { id: "d1-07", day: "2027-05-24", start: "14:00", end: "14:45", title: "Korean Traditional Performance", stage: "main", country: "kr", scene: "lake" },
  { id: "d1-08", day: "2027-05-24", start: "15:00", end: "16:00", title: "Cultural Fashion Show", stage: "main", scene: "festival" },
  { id: "d1-09", day: "2027-05-24", start: "16:00", end: "16:45", title: "Japanese Taiko Drumming", stage: "main", country: "jp", scene: "pagoda" },
  { id: "d1-10", day: "2027-05-24", start: "17:00", end: "17:45", title: "Brazilian Samba", stage: "main", country: "br", scene: "sea" },
  { id: "d1-11", day: "2027-05-24", start: "18:00", end: "18:45", title: "Thai Classical Dance", stage: "main", country: "th", scene: "stupa" },
  { id: "d1-12", day: "2027-05-24", start: "19:00", end: "20:00", title: "Evening Concert", stage: "main", scene: "stage" },

  // ── Saturday, Garden Stage ──
  { id: "d1-g1", day: "2027-05-24", start: "11:00", end: "11:45", title: "Angklung Workshop", stage: "garden", country: "id", scene: "volcano" },
  { id: "d1-g2", day: "2027-05-24", start: "12:30", end: "13:15", title: "Origami for Beginners", stage: "garden", country: "jp", scene: "pagoda" },
  { id: "d1-g3", day: "2027-05-24", start: "14:00", end: "14:45", title: "Henna Art Session", stage: "garden", country: "in", scene: "palace" },
  { id: "d1-g4", day: "2027-05-24", start: "15:30", end: "16:15", title: "Vietnamese Lantern Making", stage: "garden", country: "vn", scene: "sea" },

  // ── Sunday, Main Stage ──
  { id: "d2-01", day: "2027-05-25", start: "10:00", end: "10:30", title: "Morning Welcome", stage: "main", scene: "festival" },
  { id: "d2-02", day: "2027-05-25", start: "10:30", end: "11:15", title: "Indonesian Saman Dance", stage: "main", country: "id", scene: "temple" },
  { id: "d2-03", day: "2027-05-25", start: "11:30", end: "12:15", title: "French Chanson", stage: "main", country: "fr", scene: "city" },
  { id: "d2-04", day: "2027-05-25", start: "12:30", end: "13:15", title: "German Brass Band", stage: "main", country: "de", scene: "city" },
  { id: "d2-05", day: "2027-05-25", start: "14:00", end: "14:45", title: "Chinese Lion Dance", stage: "main", country: "cn", scene: "palace" },
  { id: "d2-06", day: "2027-05-25", start: "15:00", end: "15:45", title: "American Line Dancing", stage: "main", country: "us", scene: "savanna" },
  { id: "d2-07", day: "2027-05-25", start: "16:00", end: "17:00", title: "Parade of Nations", stage: "main", scene: "festival" },
  { id: "d2-08", day: "2027-05-25", start: "18:00", end: "19:00", title: "Closing Ceremony", stage: "main", scene: "stage" },

  // ── Sunday, Garden Stage ──
  { id: "d2-g1", day: "2027-05-25", start: "11:00", end: "11:45", title: "Batik Painting Workshop", stage: "garden", country: "id", scene: "volcano" },
  { id: "d2-g2", day: "2027-05-25", start: "13:00", end: "13:45", title: "Korean Calligraphy", stage: "garden", country: "kr", scene: "lake" },
  { id: "d2-g3", day: "2027-05-25", start: "14:30", end: "15:15", title: "Russian Tea Ceremony", stage: "garden", country: "ru", scene: "lake" },
];
