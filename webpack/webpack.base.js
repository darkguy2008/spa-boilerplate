const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const outputDir = path.resolve(__dirname, '../dist');

module.exports = {
    output: {
        path: outputDir,
        publicPath: '',
        filename: '[name].js'
    },
    devtool: 'eval',
    cache: true,
    stats: { colors: true },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '@app/root': path.resolve(__dirname, '../src/app/'),
            '@app/views': path.resolve(__dirname, '../src/app/views/'),
            '@app/services': path.resolve(__dirname, '../src/app/services/'),
            '@app/directives': path.resolve(__dirname, '../src/app/directives/'),
            '@app/components': path.resolve(__dirname, '../src/app/components/')
        }
    },
    module: {
        noParse: [
            /(node_modules|~)\/(jquery)\//gi
        ],
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: require('os').cpus().length - 1
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true
                        }
                    },
                    {
                        loader: 'angular2-template-loader'
                    },
                    {
                        loader: 'angular2-router-loader'
                    }
                ]
            },
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
            { test: /\.(svg|gif|png|jpe?g|ttf|woff2?|eot)$/, loader: 'url-loader' }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            tsconfig: path.resolve(__dirname, '../src/tsconfig.json')
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.ModuleConcatenationPlugin(),          
        new CopyPlugin([{ copyUnmodified: true, from: path.resolve(__dirname, '../src/index.html'), to: path.resolve(outputDir, 'index.html') }]),
        new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.resolve(__dirname, 'src/app')),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            jQuery: 'jquery',
        })
    ],
}
