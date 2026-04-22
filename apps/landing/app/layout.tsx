export const metadata = {
  title: "Krypton AI Landing",
  description: "Supercharge your business with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
