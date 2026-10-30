/**
 * Russian names for countries, by slug.
 * `demonym` is the feminine adjective that fits "… кухня" (e.g. "Индонезийская кухня").
 */
export const countriesRu: Record<string, { name: string; demonym: string; tagline: string }> = {
  indonesia: { name: "Индонезия", demonym: "Индонезийская", tagline: "Тысячи островов, бесконечные истории" },
  china: { name: "Китай", demonym: "Китайская", tagline: "Пять тысяч лет наследия" },
  japan: { name: "Япония", demonym: "Японская", tagline: "Где традиции встречают будущее" },
  korea: { name: "Корея", demonym: "Корейская", tagline: "Страна утренней свежести" },
  india: { name: "Индия", demonym: "Индийская", tagline: "Единство в многообразии" },
  thailand: { name: "Таиланд", demonym: "Тайская", tagline: "Страна улыбок" },
  france: { name: "Франция", demonym: "Французская", tagline: "Искусство жить" },
  germany: { name: "Германия", demonym: "Немецкая", tagline: "Страна поэтов и мыслителей" },
  usa: { name: "США", demonym: "Американская", tagline: "Пятьдесят штатов — одна сцена" },
  brazil: { name: "Бразилия", demonym: "Бразильская", tagline: "Ритм, краски и радость" },
  russia: { name: "Россия", demonym: "Русская", tagline: "От Волги до Байкала" },
  vietnam: { name: "Вьетнам", demonym: "Вьетнамская", tagline: "Вечное очарование" },
};

/** Booth activity tags, by their English text. */
export const tagsRu: Record<string, string> = {
  Food: "Еда",
  Games: "Игры",
  Culture: "Культура",
  Calligraphy: "Каллиграфия",
  Tea: "Чай",
  Music: "Музыка",
  Origami: "Оригами",
  Hanbok: "Ханбок",
  Henna: "Хна",
  Dance: "Танцы",
  Crafts: "Ремёсла",
  Pastry: "Выпечка",
  Language: "Язык",
  Art: "Искусство",
  Samba: "Самба",
  Football: "Футбол",
  "Folk Art": "Народное искусство",
  Lanterns: "Фонарики",
};
