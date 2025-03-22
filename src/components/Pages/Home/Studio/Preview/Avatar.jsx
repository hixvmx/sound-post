import { isNull } from "@/app/helpers/utils";

export default function Avatar({ img, bg, size }) {

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            img.change(imageUrl);
        } else {
            img.change(null);
        }
    }

    return (
        <label className="w-fit">
            <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
            />
            <div
                className="rounded-full bg-white overflow-hidden cursor-pointer"
                style={{
                    width: `${(size * 0.2) / 2}px`,
                    height: `${(size * 0.2) / 2}px`,
                    backgroundColor: bg.value,
                }}
            >
                {!isNull(img.value) ? <img src={img.value} className="w-full h-full" /> : null}
            </div>
        </label>
    )
}