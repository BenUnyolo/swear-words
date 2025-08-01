import { supabase } from "@/lib/supabaseClient";
import { LastUpdated } from "./LastUpdated";

export const metadata = {
  title: "Ranking",
};

export const dynamic = "force-dynamic";

export default async function Ranking() {
  let { data: words, error } = await supabase
    .from("words")
    .select("id,word,rating")
    .or("wins.gt.0,losses.gt.0")
    .order("rating", { ascending: false });

  if (error) {
    console.error(error);
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
