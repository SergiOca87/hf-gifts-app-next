import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ClientProvider from "@/app/client-provider";
import { Toaster } from "@/components/ui/sonner"


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Redeem Your Gift",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} relative px-8 py-5 bg-[#212e2e] text-white`}>
                <Header />
                <main className="py-20">
                    <ClientProvider>{children}</ClientProvider>
                </main>
                <Toaster />
            </body>
        </html >
    );
}
