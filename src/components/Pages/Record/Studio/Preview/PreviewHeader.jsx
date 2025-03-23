import { aspectRatios } from "@/app/db/globals";
import { isNull } from "@/helpers/utils";
import ColorPicker from "@/components/Shared/ColorPicker";

export default function PreviewHeader({
    videoBg = { value: '#000000', change: () => { } },
    avatarBg = { value: '#ffffff', change: () => { } },
    avatarImg = { value: '', change: () => { } },
    resolution = { value: '', change: () => { } },
    isDisabled = false,
}) {

    const backgroundColor = videoBg.value;
    const avatarColor = avatarBg.value;

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            avatarImg.change(imageUrl);
        } else {
            avatarImg.change(null);
        }
    }

    return (
        <div className="w-full flex items-center justify-between gap-2">
            <div className="w-full flex items-center gap-2">

                {/* Background Color */}
                <label className={`py-1 px-1.5 rounded flex items-center gap-1 select-none border textBody-s3 ${isDisabled ? 'cursor-not-allowed opacity-60 select-none' : 'hover:bg-bg-2 cursor-pointer'}`}>
                    <div className="w-6 h-6 rounded border" style={{ backgroundColor: backgroundColor }}>
                        <ColorPicker
                            value={backgroundColor}
                            onChange={(color) => videoBg.change(color)}
                            disabled={isDisabled}
                        />
                    </div>
                    Background
                </label>

                {/* Avatar Image */}
                <label className={`py-1 px-1.5 rounded flex items-center gap-1 select-none border textBody-s3 ${isDisabled ? 'cursor-not-allowed opacity-60 select-none' : 'hover:bg-bg-2 cursor-pointer'}`}>
                    <div className="w-6 h-6 rounded border" style={{ backgroundColor: avatarColor }}></div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        disabled={isDisabled}
                        hidden
                    />
                    Avatar
                </label>
            </div>

            {/* Video Sizes */}
            <select
                value={resolution.value}
                onChange={(e) => resolution.change(e.target.value)}
                disabled={isDisabled}
                className={`h-[34px] px-1.5 rounded flex items-center gap-1 select-none border textBody-s3 outline-0 ${isDisabled ? 'cursor-not-allowed opacity-60 select-none' : 'hover:bg-bg-2 cursor-pointer'}`}>
                {isNull(resolution.value) && <option value="" disabled></option>}
                {Object.keys(aspectRatios).map((res) => (
                    <option key={res} value={res}>
                        {res}
                    </option>
                ))}
            </select>
        </div>
    )
}