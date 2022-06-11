const CracoLessPlugin = require('craco-less');
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src'),
      "~":path.join(__dirname, 'public')
    }
  },

  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};