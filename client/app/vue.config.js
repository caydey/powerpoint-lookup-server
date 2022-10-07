const isProd = process.env.NODE_ENV === "production";

module.exports = {
  transpileDependencies: !isProd, // re-compile dependencies for production
  productionSourceMap: false,
};
