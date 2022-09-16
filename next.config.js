module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: "@svgr/webpack",
    });
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: { domains: ["firebasestorage.googleapis.com"] },
  optimizeFonts: false,
  env: {
    MONGO_URI:
      "mongodb+srv://marvs:marvs@cluster0.hqik2jt.mongodb.net/?retryWrites=true&w=majority",
  },
};
