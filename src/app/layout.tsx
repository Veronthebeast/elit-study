import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elit Study",
  description: "Tu hub universitario personal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
