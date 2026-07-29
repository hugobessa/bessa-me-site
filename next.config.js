module.exports = {
    // `next build` and `next dev` share .next by default, so building while a
    // dev server is running wipes the chunks it is serving and the page loads
    // with no JS. Set NEXT_DIST_DIR to build somewhere else alongside dev.
    distDir: process.env.NEXT_DIST_DIR || '.next',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.us-west-2.amazonaws.com',
                pathname: '/secure.notion-static.com/**',
            },
            {
                protocol: 'https',
                hostname: 's3.us-east-2.amazonaws.com',
                pathname: '/secure.notion-static.com/**',
            },
            {
                protocol: 'https',
                hostname: 'prod-files-secure.s3.us-east-2.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
            },
        ],
    },     
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    },
};
