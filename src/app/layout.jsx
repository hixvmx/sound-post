import "./globals.css";


export const metadata = {
    title: "SoundPost - Voice posts made simple.",
    description: "Voice posts made simple.",
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
