const path = require("path");

const config = (isProduction, WpEnv) => ({
  entry: './src/index.js',
  optimization: {
    minimize: true,
  },
  experiments: { outputModule: true },
  output: {
    clean: true,
    publicPath: isProduction
      ? WpEnv.publicPath ? WpEnv.publicPath : ''
      : WpEnv.publicPath ? WpEnv.publicPath : '',
    filename: "[name].js",
    libraryTarget: "module",
  },
  plugins: [

  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ]
      },
    ],
  },
  devServer: {
    port: 3001,
    https: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
});

module.exports = (env) => {
  return config(process.env.NODE_ENV == "production", env);
};
