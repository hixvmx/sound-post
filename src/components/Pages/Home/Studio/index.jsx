"use client"
import { useState } from "react";
import Preview from "./Preview";
import PreviewHeader from "./Preview/PreviewHeader";
import { aspectRatios } from "@/app/db/globals";


export default function Studio() {

    // Avata and BG colors
    const [videoBg, setVideoBg] = useState('#000000')
    const [avatarBg, setAvatarBg] = useState('#f3f3f3')
    const [avatarImg, setAvatarImg] = useState(null);
    const [selectedResolution, setSelectedResolution] = useState("Stream (16:9)");


    // Get selectd size
    const { width: videoWidth, height: videoHeight } = aspectRatios[selectedResolution];


    return (
        <section id="record">
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center border-t border-border-1/50 mb-80 pt-20">
                <div className="flex flex-col w-full max-w-2xl mx-auto">
                    <PreviewHeader
                        videoBg={{ value: videoBg, change: setVideoBg }}
                        avatarBg={{ value: avatarBg, change: setAvatarBg }}
                        avatarImg={{ value: avatarImg, change: setAvatarImg }}
                        resolution={{ value: selectedResolution, change: setSelectedResolution }}
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