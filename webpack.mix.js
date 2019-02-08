const mix = require("laravel-mix")
const TargetsPlugin = require("targets-webpack-plugin")
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"@": __dirname + "/resources/js"
		}
	},
	plugins: [
		new TargetsPlugin({
			browsers: ["last 2 versions", "chrome >= 41", "IE 11"]
		})
	]
})

mix
	.react("resources/js/app.js", "public/js")
	.sass("resources/sass/app.scss", "public/css")

if (mix.inProduction()) {
	mix.version()
}
