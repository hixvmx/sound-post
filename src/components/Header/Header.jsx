import getEnv from "@/helpers/env";
import Link from "next/link";


export default function Header() {

    // repo link on github
    const projectLink = getEnv('repoUrl');

    return (
        <header className="w-full border-b">
            <div className="px-2 lg:px-4 xl:px-8 w-full flex items-center justify-between py-3">
                <Link href="/">
                    <strong className="textBody-ml1 text-black select-none">SoundPost</strong>
                </Link>
                <a href={projectLink} target="_blank">
                    <button className="textBody-s2 bg-primary-1 py-2.5 px-6 rounded-md hover:bg-primary-2 transition-colors duration-200 text-white">
                        Github
                    </button>
                </a>
            </div>
        </header>
    )
}