import "./globals.css";


export const metadata = {
    title: "SoundPost - Voice posts made simple.",
    description: "Easily create and share voice posts on social media.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
