module.exports = {
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
