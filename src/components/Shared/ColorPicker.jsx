import { useState } from "react";


export default function ColorPicker({
    className = "w-full h-full opacity-0 cursor-pointer",
    value,
    onChange,
    ...props
}) {


    const [timeoutId, setTimeoutId] = useState(null)


    const handleColorChange = (e) => {
        const newColor = e.target.value;

        // Clear previous timeout to avoid too many updates
        if (timeoutId) clearTimeout(timeoutId);

        // Set a new timeout to update after 500ms (adjust as needed)
        const newTimeoutId = setTimeout(() => {
            onChange(newColor)
        }, 10);

        setTimeoutId(newTimeoutId);  // Store the timeout ID to clear it if necessary
    };


    return (
        <input
            value={value}
            onChange={handleColorChange}
            type="color"
            className={className}
            {...props}
        />
    )
}