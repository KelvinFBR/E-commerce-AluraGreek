const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /styles\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: false,
          sources: false,
        },
      },
      //*   este es apara hacer uso de imagenes o archivos en js - pero es mejor utilizarlos de manera statica podemos pasar esos archivos, img a la cappeta dist para ser usados.
      {
        test: /\.(png|jpg|svg|gif)$/i,
        loader: "file-loader",
        loader: "url-loader",
        //   * y para que a la hora de importar unos modulos no nos de problema.
        options: { esModule: false },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      //* Aqui aplicamos el nombre que va a contener el archivo
      filename: "[name].css",

      //* Esto es para que no nos tire unos warning
      ignoreOrder: true,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets/", to: "assets/" }],
    }),
  ],
};
