const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/"
  },
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js"
      },
      shared: dependencies
    })
  ]
};

module.exports = merge(commonConfig, devConfig);
