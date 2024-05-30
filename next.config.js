module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'markdown-loader'
    });
    return config;
  },
  sassOptions: {
    outputStyle: 'expanded',
    indentWidth: 4,
    additionalData: `
        @use 'styles/vars' as *;
        @use 'styles/breakpoints' as bp;
        @use 'styles/typography' as type;
        @use 'styles/colours' as col;
        @use 'styles/utilities' as util;
        @use 'styles/animations' as animate;
      `
  }
};
