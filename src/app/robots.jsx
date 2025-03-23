import getEnv from "@/helpers/env";

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: getEnv("appUrl") + 'sitemap.xml',
    }
}