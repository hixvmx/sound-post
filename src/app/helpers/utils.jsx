
// Checks if an object is null or empty.
export const isObjNull = (obj) => {
    return obj === undefined || (obj && Object.keys(obj).length === 0 && obj.constructor === Object);
};

// Checks if a value (string, array, or object) is empty or null.
export const isNull = (value) => {
    if (value == null || value === "null") return true;
    if (typeof value === "string" || Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return isObjNull(value);
    return false;
};