
// set .env variables
const VARIABLES = {
    "local": process.env.NEXT_PUBLIC_APP_LOCAL ?? "local",
    "appUrl": process.env.NEXT_PUBLIC_APP_URL ?? "https://localhost:1219",
    "repoUrl": process.env.NEXT_PUBLIC_GITHUB_REPO_URL ?? "/",
    "appName": process.env.NEXT_PUBLIC_APP_Name ?? "app",
};


export default function getEnv(key = "") {
    if (!key) return "";

    return VARIABLES[key] ?? "";
}