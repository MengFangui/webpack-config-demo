var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: './src/app.js',
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name].js'
	},
	module: {
		loaders: [{
				test: /\.js$/,
				//以下目录不处理
				exclude: /node_modules/,
				//只处理以下目录
				include: /src/,
				loader: "babel-loader",
				//配置的目标运行环境（environment）自动启用需要的 babel 插件
				query: {
					presets: ['latest']
				}
			},
			//css 处理这一块
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							//支持@important引入css
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function() {
								return [
									//一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
									require('postcss-import')(),
									require("autoprefixer")({
										"browsers": ["Android >= 4.1", "iOS >= 7.0", "ie >= 8"]
									})
								]
							}
						}
					}
				]
			},
			//less 处理这一块
			{
				test: /\.less$/,
				use: ['style-loader',
					{
						loader: 'css-loader',
						options: {
							//支持@important引入css
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function() {
								return [
									//一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
									require('postcss-import')(),
									require("autoprefixer")({
										"browsers": ["Android >= 4.1", "iOS >= 7.0", "ie >= 8"]
									})
								]
							}
						}
					},
					'less-loader'
				]
			},
			//处理html模板
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader'
				}
			},
			//处理图片
			{
				test: /\.(png|jpg|gif|svg)$/i,
				loaders:[
				//小于8k的图片编译为base64，大于10k的图片使用file-loader			
				'url-loader?limit=8192&name:img/[name]-[hash:5].[ext]',
				//图片压缩
				'image-webpack-loader'
				]
								
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'index.html',
			filename: 'index.html'
		})
	]
}