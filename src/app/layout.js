import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Redeem Your Gift",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} px-8 py-5 bg-[#212e2e] text-white`}>
                <Header />
                <main className="py-20">{children}</main>
            </body>
        </html >
    );
}
