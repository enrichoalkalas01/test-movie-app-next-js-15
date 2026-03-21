import type { NextConfig } from "next";

const BASE_PATH = "/portofolio/show/test-movie-app-next-js-15";

const nextConfig: NextConfig = {
    basePath: BASE_PATH,
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "storage.googleapis.com" },
            { protocol: "https", hostname: "m.media-amazon.com" },
            { protocol: "http", hostname: "m.media-amazon.com" },
        ],
    },
};

export default nextConfig;
