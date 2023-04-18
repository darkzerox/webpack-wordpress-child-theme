const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CleanCSSPlugin = require("clean-css");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const autoprefixer = require("autoprefixer");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const path = require("path");

const mode =
	process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
	mode,
	entry: {
		app: ["./assets/js/app.js", "./assets/scss/app.scss"],
	},
	output: {
		filename: "public/script/app.js",
		path: path.resolve(__dirname),
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "../",
						},
					},
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [autoprefixer()],
							},
						},
					},
					mode === "production" ? "clean-css-loader" : false,
					"sass-loader",
				].filter(Boolean),
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "public/style/app.css",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "assets/images",
					to: "public/images",
				},
				{
					from: "assets/fonts",
					to: "public/fonts",
				},
			],
		}),
		mode === "development"
			? new BrowserSyncPlugin({
					host: "localhost",
					port: 3000,
					server: { baseDir: ["public"] },
			  })
			: false,
	].filter(Boolean),
	optimization: {
		minimize: mode === "production",
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false,
					},
				},
				extractComments: false,
			}),
		],
	},
};
