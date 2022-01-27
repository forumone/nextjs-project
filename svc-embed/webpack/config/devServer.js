/**
 * Created by: Andrey Polyakov (andrey@polyakov.im)
 * @see https://webpack.js.org/configuration/dev-server/
 */

import { devServerProxyConfig } from './devServierProxy';

export const devServerConfig = {
  allowedHosts: ['localhost', '.ngrok.io', '.ddev.site'],
  client: {
    overlay: false,
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  hot: true,
  proxy: devServerProxyConfig,
  static: {
    publicPath: '/',
  },
};
