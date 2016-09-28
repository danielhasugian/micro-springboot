var webpack = require('webpack');
var config = JSON.parse(require('fs').readFileSync('./package.json'));

var webPackCfg = {
module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['react','es2015']
      }
    }
  ]
},
entry : {
	app: [config.buildSource+'/'+config.mainJs]
},
output: {
	filename: "index.min.js"
},
plugins: 
	(config.mode == 'dev' ? 
			[]
		: 
			[
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						warnings: false,
					},
					output: {
						comments: false,
					},
				})
			]
	)
};

if (config.webpackDebug){
	console.log("Webpack is set for debugging");
	webPackCfg.debug = true;
}

module.exports = webPackCfg;