const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
    devServer: {
        port: 3000,     // 端口号
    },

    // configureWebpack: {
    //     plugins:[
    //         new CompressionPlugin({
    //             algorithm: "gzip", // 使用gzip压缩
    //             test: /\.js|\.html|\.css/, // 匹配文件名
    //             filename: "[path][base].gz", // 压缩后的文件名(保持原文件名，后缀加.gz)
    //             minRatio: 1, // 压缩率小于1才会压缩
    //             threshold: 10240, // 对超过10k的数据压缩,一般都会选择大于1字节的进行压缩，小于1字节可能压缩后反而体积更大了
    //             deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
    //         }),
    //     ]
    // },

    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    }
};
