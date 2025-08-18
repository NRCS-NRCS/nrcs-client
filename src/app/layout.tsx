import './globals.css';

import type { Metadata } from 'next';
import {
    Montserrat,
    Open_Sans,
} from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-text',
});

const openSans = Open_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-heading',
});

/* eslint-disable react-refresh/only-export-components */
export const metadata: Metadata = {
    title: 'Nepal Red Cross Society',
    description: 'Nepal Red Cross Society',
};

export default function RootLayout({
    children,
}: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${openSans.variable}`}>
                {children}
            </body>
        </html>
    );
}
