import '../app/globals.css';
import { ThemeProvider } from 'next-themes';

export const metadata = { title: "KYC Dashboard" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
