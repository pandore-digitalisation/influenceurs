export const metadata = {
  title: "Scraper Frontend",
  description: "Recherche et exportation de profils depuis différentes plateformes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}