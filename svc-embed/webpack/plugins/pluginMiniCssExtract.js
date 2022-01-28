import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = {
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  // filename: '[name].[contenthash].css',
  // chunkFilename: '[id].[contenthash].css',
  filename: '[name].css',
};

export const miniCssExtractPlugin = new MiniCssExtractPlugin(config);
