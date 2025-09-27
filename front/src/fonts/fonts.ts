import { Josefin_Sans, Zen_Kaku_Gothic_New } from 'next/font/google';

export const jose = Josefin_Sans({
    weight: ["100", "200", "300", "400", "500", "600"],
    subsets: ['latin'],
    style: ['italic'],
})

export const zen = Zen_Kaku_Gothic_New({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap"
})
