import "@/styles/globals.css";
import "@/styles/material-icons/index.css";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

const fontAspektaVariable = localFont({
  src: "../../public/fonts/aspekta-variable.woff2",
  variable: "--font-aspekta-variable",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${fontAspektaVariable.variable} antialiased`}>
        <aside>
          <Toaster
            gutter={16}
            position="bottom-right"
            toastOptions={{
              style: {
                transition: "0ms",
                height: "auto",
                maxWidth: "none",
                padding: 0,
                margin: 0,
                boxShadow: "none",
              },
            }}
            containerStyle={{
              margin: 0,
              padding: 0,
              bottom: "3rem",
              right: "3rem",
            }}
          />
        </aside>
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
