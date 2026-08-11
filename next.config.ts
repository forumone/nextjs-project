import type { NextConfig } from 'next';
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import SvgSpritemapPlugin from 'svg-spritemap-webpack-plugin';
import type Webpack from 'webpack';

const basePath: NextConfig['basePath'] = '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath,
  /**
   * Custom Webpack Config
   * https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
   */
  webpack: (
    config: Webpack.Configuration,
    { webpack }: { webpack: typeof Webpack },
  ) => {
    // Plugins is optional. If undefined, set it.
    if (!config.plugins) {
      config.plugins = [];
    }
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_BASEPATH': JSON.stringify(basePath || ''),
        // Note: If you need to define env vars for client side use,
        // consider adding them in a .env file with a key prepended
        // with "NEXT_PUBLIC_". This will make those vars automatically
        // available on the client.
      }),
    );

    config.plugins.push(
      new StylelintWebpackPlugin({
        exclude: ['node_modules', 'storybook-static'],
      }),
    );

    config.plugins.push(
      new SvgSpritemapPlugin('source/01-global/icon/svgs/*.svg', {
        output: {
          filename: 'static/sprite.artifact.svg',
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

    return config;
  },
};

export default nextConfig;
