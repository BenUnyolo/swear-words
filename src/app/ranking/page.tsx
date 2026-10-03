import { sql } from "@/lib/db";
import { LastUpdated } from "./LastUpdated";

export const metadata = {
  title: "Ranking",
};

export const dynamic = "force-dynamic";

type RankedWord = { id: number; word: string; rating: number };

export default async function Ranking() {
  let words: RankedWord[] | null = null;
  try {
    words = (await sql`
      SELECT id, word, rating FROM words
      WHERE wins > 0 OR losses > 0
      ORDER BY rating DESC
    `) as RankedWord[];
  } catch (e) {
    console.error(e);
  }

  const updatedDate = new Date();

  return (
    <div className="flex-1">
      <h1>Ranking</h1>
      {words ? (
        <>
          <p className="mb-2 text-sm opacity-80">
            <LastUpdated updatedDate={updatedDate} />
          </p>
          <ol className="list-inside list-decimal space-y-2">
            {words.map((d) => {
              const { id, word } = d;
              return <li key={id}>{word}</li>;
            })}
          </ol>
        </>
      ) : (
        <p>There was an issue fetching the ranking, try refreshing the page.</p>
      )}
    </div>
  );
}
