import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ClientProvider from "@/app/client-provider";
import { Toaster, toast } from 'sonner'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Redeem Your Gift",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} relative text-white overflow-x-hidden h-full min-h-svh`}>
                {/* <Header /> */}
                <main>
                    <ClientProvider>{children}</ClientProvider>
                </main>
                <Toaster />
            </body>
        </html >
    );
}
