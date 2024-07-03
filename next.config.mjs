/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "infinite-stream-64309-36de2b4471ee.herokuapp.com",
                port: "", // Optional: if the port is not necessary, you can leave it empty
                pathname: "/uploads/**/*",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
                // No need to specify pathname if you want to allow all paths
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            }
        ],
    },
};

export default nextConfig;
