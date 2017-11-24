const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const liveReloadPlugin = require('webpack-livereload-plugin');

const appConfig = {
	name: 'bundle',
	entry: {
		bundle: './src/app/index.ts'
	},
	plugins: [
		new liveReloadPlugin()
	]
};

module.exports = [
	webpackMerge(baseConfig, appConfig)
];
