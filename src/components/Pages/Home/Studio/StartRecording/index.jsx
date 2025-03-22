"use client";
import { aspectRatios } from "@/app/db/globals";
import { convertSecondsToTime } from "@/app/helpers/utils";
import { useRef, useState } from "react";

export default function StartRecording({
    videoBg,
    avatarBg,
    avatarImg,
    selectedResolution,
    videoUrl, setVideoUrl,
    isRecording, setIsRecording,
    avatarRef
}) {
    const canvasRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const videoRef = useRef(null);
    const [recordTime, setRecordTime] = useState(0);
    const animationFrameRef = useRef(null);
    const timerRef = useRef(null);
    const zoomFactorRef = useRef(1);
    let zoomFrame = 0;


    // Get Canvas Width/Height by 'selectedResolution'
    const updateCanvasSize = () => {
        const { width, height } = aspectRatios[selectedResolution];
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        return { ctx, width, height };
    }

    // Set Canvas Content
    const drawCanvasLoop = () => {
        const { ctx, width, height } = updateCanvasSize();
        ctx.fillStyle = videoBg;
        ctx.fillRect(0, 0, width, height);

        // Smooth zoom-in/out animation
        zoomFrame += 0.03;
        zoomFactorRef.current = 1 + Math.sin(zoomFrame) * 0.1;

        // Avatar (with animation)
        const avatarSize = width * 0.2 * zoomFactorRef.current;
        const avatarX = width / 2 - avatarSize / 2;
        const avatarY = height / 2 - avatarSize / 2;

        if (avatarImg) {
            const avatar = avatarRef.current;
            ctx.save();
            ctx.beginPath();
            ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
            ctx.restore();
        } else {
            ctx.fillStyle = avatarBg;
            ctx.beginPath();
            ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        animationFrameRef.current = requestAnimationFrame(drawCanvasLoop);
    }

    // handle start recording
    const startRecording = async () => {
        setIsRecording(true);
        setRecordTime(0);
        drawCanvasLoop();
        timerRef.current = setInterval(() => setRecordTime((prev) => prev + 1), 1000);

        // const { width, height } = aspectRatios[selectedResolution];
        const canvas = canvasRef.current;
        const videoStream = canvas.captureStream(30);

        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const combinedStream = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()]);

            mediaRecorderRef.current = new MediaRecorder(combinedStream, {
                mimeType: "video/webm", // You can try 'video/mp4' if supported
                videoBitsPerSecond: 2500000,
            });

            const recordedChunks = [];
            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) recordedChunks.push(e.data);
            };

            mediaRecorderRef.current.onstop = () => {
                cancelAnimationFrame(animationFrameRef.current);
                clearInterval(timerRef.current);
                audioStream.getTracks().forEach((track) => track.stop());

                const blob = new Blob(recordedChunks, { type: "video/webm" });
                setVideoUrl(URL.createObjectURL(blob));
                setIsRecording(false);
            };

            mediaRecorderRef.current.start();
        } catch (error) {
            // console.error("Error accessing media devices:", error);
            setIsRecording(false);
        }
    }

    // Stops the recording
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
    }

    // resets the recording states
    const resetAllStates = () => {
        setVideoUrl(null);
        setIsRecording(false);
        setRecordTime(0);
    }

    // Get the video width/height by 'selectedResolution'
    const { width: videoWidth, height: videoHeight } = aspectRatios[selectedResolution];

    return (
        <div className="flex flex-col">
            <canvas ref={canvasRef} className="hidden" />

            {!videoUrl ? (
                <div className="mt-4 flex items-centr gap-2">
                    {!isRecording ? (
                        <button onClick={startRecording} className="w-fit py-2.5 px-5 bg-green-600 text-white rounded mr-2">
                            Start Recording
                        </button>
                    ) : (
                        <button onClick={stopRecording} className="w-fit py-2.5 px-5 bg-red-600 text-white rounded">
                            Stop Recording
                        </button>
                    )}

                    {/* ⏱️ Show Recording Timer */}
                    {isRecording && <p className="text-xl font-bold mt-2">⏺ {convertSecondsToTime(recordTime)}</p>}
                </div>
            ) : (
                <>
                    <div className="my-2 bg-bg-3">
                        <video
                            ref={videoRef}
                            controls
                            src={videoUrl}
                            className="mx-auto" style={{ width: `${videoWidth / 3}px`, height: `${videoHeight / 3}px` }}
                        />
                    </div>
                    <button onClick={resetAllStates} className="mt-2 w-fit py-2.5 px-5 bg-blue-600 text-white rounded">
                        Restart
                    </button>
                </>
            )}
        </div>
    );
}
