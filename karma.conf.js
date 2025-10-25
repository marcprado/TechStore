module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'src/**/tester.espec.js'
    ],

    preprocessors: {
      'src/**/tester.espec.js': ['webpack']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: { 
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      },
      devtool: 'inline-source-map'
    },

    browsers: ['Chrome'],
    singleRun: false,
    autoWatch: true,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO
  });
};