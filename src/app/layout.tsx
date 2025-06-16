import Header from "./components/header";
import Sidebar from "./components/sidebar";
import "./globals.css"; // Your global styles including Tailwind imports
import BottomContainer from "./components/BottomContainer";

export const metadata = {
  title: "Next.js Fixed Layout",
  description:
    "Layout with fixed header, sidebar, scrolling content, and fixed footer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className="flex m-auto flex-col min-h-screen bg-gray-100">
        <Header />

          <main className="flex-1  bg-gray-900 p-4 overflow-y-auto">{children}</main>

      </body>
    </html>
  );
}
