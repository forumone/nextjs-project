const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const YAML = require('yaml');
const ddevHostname = process.env.DDEV_HOSTNAME || process.env.VIRTUAL_HOST;

module.exports = {
  staticDirs: ['../public'],
  stories: ['../source/**/*.stories.@(js|jsx|ts|tsx)', '../source/**/*.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/nextjs',
  },
  core: {
    // Replace allowedHosts value with your DDEV URL if neither ddevHostname nor the .ddev.site pattern apply.
    allowedHosts: ddevHostname ? [ddevHostname] : ['.ddev.site'],
  },
  webpackFinal: async config => {
    config.plugins.push(
      new StylelintWebpackPlugin({
        exclude: ['node_modules', 'storybook-static', '.next'],
      }),
    );
    config.module.rules.push({
      test: /\.ya?ml$/i,
      type: 'json',
      parser: {
        parse: YAML.parse,
      },
    });
    config.module.rules.find(
      rule => rule.test && rule.test.toString().includes('css'),
    ).resourceQuery = {
      not: /raw/,
    };
    config.module.rules.push({
      test: /\.css$/,
      resourceQuery: /raw/,
      type: 'asset/source',
    });
    return config;
  },
};
