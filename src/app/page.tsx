import { Match } from "./(components)/(match)/Match";
import { InstructionsDialog } from "./(components)/Dialog";

export default function Home() {
  return (
    <div className="py-6">
      <InstructionsDialog />
      <h1 className="sr-only">SwearWords.co.uk</h1>
      <h2 className="mb-6 text-center text-4xl font-bold sm:text-5xl">
        {`The Definitive Ranking of British Swear Words`}
      </h2>
      <Match />
    </div>
  );
}
