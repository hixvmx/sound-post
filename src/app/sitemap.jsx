
import getEnv from "@/helpers/env";


export default function sitemap() {

    const baseUrl = getEnv("appUrl");

    return [
        {
            url: baseUrl + '',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        }, {
            url: baseUrl + 'record/',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];
}
