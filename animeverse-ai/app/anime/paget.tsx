// app/anime/page.tsx
import Image from 'next/image';

type Anime = {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
};

async function getAnime(): Promise<Anime[]> {
  const res = await fetch('https://api.jikan.moe/v4/anime?q=naruto&limit=10');

  if (!res.ok) {
    throw new Error('Failed to fetch anime');
  }

  const json = await res.json();
  return json.data;
}

export default async function AnimePage() {
  const animeList = await getAnime();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">🔥 Naruto Anime Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {animeList.map(anime => (
          <div key={anime.mal_id} className="border rounded-lg p-4 bg-white shadow">
            <Image
              src={anime.images.jpg.image_url}
              alt={anime.title}
              width={300}
              height={400}
              className="rounded mb-2"
            />
            <h2 className="text-xl font-semibold">{anime.title}</h2>
            <p>⭐ Score: {anime.score || 'N/A'}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
