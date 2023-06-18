import { Nav } from "./(components)/(nav)/Nav";
import "./globals.css";
import { Nunito } from "next/font/google";
import { ContextProvider } from "../context";
import Script from "next/script";

const nunito = Nunito({ subsets: ["latin"] });
// Nunito;
// Rubik;
// Poppins;
// Outfit;
// Varela Round
// Karla;

export const metadata = {
  title: "SwearWords.co.uk",
  description:
    "Help create the definitive ranking of British swear words! Your votes determine which words are the most offensive. Not for the faint-hearted or easily offended!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ContextProvider>
          <div className={`flex min-h-screen flex-col`}>
            <Nav />
            <main className="grow">
              <div className="flex min-h-[calc(100vh-8rem)] flex-col justify-center">
                {/* <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center space-y-4"> */}
                {children}
              </div>
            </main>
            <div className="h-16"></div>
          </div>
        </ContextProvider>
        <Script
          async
          src="https://analytics.umami.is/script.js"
          data-website-id="7d1b8fd7-f8f9-45dc-b578-4898db120005"
        />
      </body>
    </html>
  );
}
