"use client"
import { useState } from "react";
import Preview from "./Preview";
import PreviewHeader from "./Preview/PreviewHeader";


export default function Studio() {

    // Avata and BG colors
    const [videoBg, setVideoBg] = useState('#000000')
    const [avatarBg, setAvatarBg] = useState('#ffffff')
    const [avatarImg, setAvatarImg] = useState(null);


    // const { width, height } = { width: 1920, height: 1080 };
    const videoWidth = 1920;
    const videoHeight = 1080;

    return (
        <section id="record">
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center border-t mb-20 pt-10">


                <div className="flex flex-col gap-1">
                    <PreviewHeader
                    />
                    <Preview
                        videoSize={{ w: videoWidth, h: videoHeight }}
                        videoBg={{ value: videoBg, change: setVideoBg }}
                        avatarBg={{ value: avatarBg, change: setAvatarBg }}
                        avatarImg={{ value: avatarImg, change: setAvatarImg }}
                    />
                </div>
            </div>
        </section>
    )
}