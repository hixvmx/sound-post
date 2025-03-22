import Avatar from "./Avatar";

export default function Preview({
    videoSize = { w: 0, h: 0 },
    videoBg = { value: '#ffffff', change: () => { } },
    avatarBg = { value: '#ffffff', change: () => { } },
    avatarImg = { value: '', change: () => { } },
}) {

    const { w, h } = videoSize;

    return (
        <div
            className="my-4 flex items-center justify-center"
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
    )
}