import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

const {resolve} = require('path')
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {},
    build: {
       target: 'modules',
        cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
        terserOptions: {
            compress: {
                drop_console: true,  //打包时删除console
                drop_debugger: true, //打包时删除 debugger
                pure_funcs: ['console.log'],
            }
        },
        // rollupOptions: {
        //     external: [],
        //     output: {}
        // }
    },
    server: {
        open: true, //启动自动打开浏览器
        hmr: true, //启动热更新
        host: '0.0.0.0',  // 设置0.0.0.0控制台显示外部访问的地址
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://multi.span.test.yjcloud.com',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    resolve: {
        alias: {
            "@": resolve("src"),
            '*': resolve(''),
            'Assets': resolve('src/assets'),
            //https://dev.to/0xbf/vite-module-path-has-been-externalized-for-browser-compatibility-2bo6
            //vite禁止在客户端访问内置模块代码
            path: 'path-browserify',
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less'] //忽略文件后缀
    },
})
