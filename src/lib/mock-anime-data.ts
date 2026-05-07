export const mockAnimeData = [
  {
    title: "Атака титанов",
    titleEn: "Attack on Titan",
    description: "История о человечестве, живущем за огромными стенами из-за угрозы титанов",
    poster: "https://via.placeholder.com/300x450",
    year: 2013,
    type: "anime-serial",
    status: "completed",
    episodes: 75,
    rating: 9.0,
    genres: ["Action", "Drama", "Fantasy"],
    studios: ["Wit Studio", "MAPPA"]
  },
  {
    title: "Стальной алхимик",
    titleEn: "Fullmetal Alchemist: Brotherhood",
    description: "Два брата-алхимика ищут философский камень",
    poster: "https://via.placeholder.com/300x450",
    year: 2009,
    type: "anime-serial",
    status: "completed",
    episodes: 64,
    rating: 9.1,
    genres: ["Action", "Adventure", "Drama"],
    studios: ["Bones"]
  }
];

export function generateMockEpisodes(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    number: i + 1,
    title: `Эпизод ${i + 1}`,
    duration: 24,
  }));
}
