import Link from "next/link";

/* eslint-disable react/no-unescaped-entities */
export const metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="flex-1">
      <h1 className="mb-1 text-3xl md:text-4xl">About</h1>
      <p className="mt-4">
        I'm{" "}
        <Link
          href="https://benunyolo.com"
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ben
        </Link>
        , the creator of SwearWords.co.uk. I created the site because I had an
        idea one day that it was time to decide, once and for all, which are the
        "worst" British swear words.
      </p>
      <p className="mt-4">
        If you're interested in that sort of thing, the ranking uses the Elo
        rating system.
      </p>
      <p className="mt-4">
        If you have any questions{" "}
        <Link href="/contact" className="link">
          you can reach out to me here
        </Link>
        .
      </p>
    </div>
  );
}
