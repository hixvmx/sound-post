import { VoiceIcon } from "@/app/db/icons";


export default function Hero() {

    return (
        <section>
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center min-h-[60dvh] gap-3">
                <a href="/">
                    <strong className="textBody-l1 text-black select-none">SoundPost</strong>
                </a>
                <h1 className="text-6xl leading-[70px] font-[800]">Voice posts made simple.</h1>
                <p className="textBody-ml3">Easily create and share voice posts on social media.</p>
                <a href="/record">
                    <button className="mt-6 textBody-m2 bg-primary-1 py-3 px-6 rounded-md hover:bg-primary-2 transition-colors duration-200 text-white flex items-center gap-2">
                        <VoiceIcon className="size-8" />
                        <span className="whitespace-nowrap">Start recording</span>
                    </button>
                </a>
            </div>
        </section>
    )
}