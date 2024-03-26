import { Domine as FontSerif, JetBrains_Mono as FontMono, Rubik as FontSans } from "next/font/google";

const fontMono = FontMono({ subsets: ["latin"], variable: "--font-mono" });
const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const fontSerif = FontSerif({ subsets: ["latin"], variable: "--font-serif" });

export { fontMono, fontSans, fontSerif };
