module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.optimization.splitChunks = {
        cacheGroups: {
          default: false,
        },
      };
      webpackConfig.optimization.runtimeChunk = false;
      webpackConfig.output.filename = "static/js/[name].js";
      webpackConfig.plugins[5].options.filename = "static/css/[name].css";
      return webpackConfig;
    },
  },
};

// npm run build-extension
