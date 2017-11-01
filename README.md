# vue-project-setup #

**webpack配置**<br>
>
1. package.json  定义项目依赖模块 以及 定义开启服务器和打包命令
2. helpers.js  获取入入口文件和html文件
3. webpack.base.config.js  定义webpack基础配置
4. webpack.dev.config.js   定义webpack开发配置
5. webpack.prod.config.js  定义webpack生产配置
6. server.js 启动服务的主入口

**项目执行流程：**<br>
>
1. 根目录下执行 cnpm install 安装项目依赖模块<br>
2. 执行 npm run dev<br>
3. npm run build打包<br>
4. 线上使用 npm run start 启动服务
