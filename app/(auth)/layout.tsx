import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import '../globals.css';

export const metadata = {
 title: 'Threads',
 description: 'A nextjs 14 Meta threads Application',
};

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
        <html lang="es">
            <body className={`${inter.className} bg-dark-1`}>
                {children}
            </body>
        </html>
    </ClerkProvider>
  );
}