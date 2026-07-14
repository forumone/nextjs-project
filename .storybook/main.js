const path = require('path');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const SvgSpritemapPlugin = require('svg-spritemap-webpack-plugin').default;
const YAML = require('yaml');

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
  // Replace with the DDEV URL for your site
  core: {
    allowedHosts: ['nextjs-project.ddev.site', 'localhost'],
  },
  webpackFinal: async config => {
    config.plugins.push(
      new StylelintWebpackPlugin({
        exclude: ['node_modules', 'storybook-static', '.next'],
      }),
    );
    config.plugins.push(
      new SvgSpritemapPlugin('source/01-global/icon/svgs/*.svg', {
        output: {
          filename: '_next/static/sprite.artifact.svg',
          svg4everybody: false,
          svgo: true,
        },
        sprite: {
          prefix: '',
          generate: {
            title: false,
            use: true,
          },
        },
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
