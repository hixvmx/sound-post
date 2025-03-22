import Avatar from "./Avatar";

export default function Preview({
    videoSize = { w: 0, h: 0 },
    videoBg = { value: '#000000', change: () => { } },
    avatarBg = { value: '#ffffff', change: () => { } },
    avatarImg = { value: '', change: () => { } },
}) {

    const { w, h } = videoSize;

    return (
        <div className="my-2 bg-bg-3">
        <div
            className="flex items-center justify-center mx-auto"
            style={{
                width: `${w / 3}px`,
                height: `${h / 3}px`,
                backgroundColor: videoBg.value,
            }}
        >
            <Avatar
                img={avatarImg}
                bg={avatarBg}
                size={w}
            />
        </div>
        </div>
    )
}