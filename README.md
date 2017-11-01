# vue-project-setup #

**本套构建项目主要涉及到的功能模块有**
1. 通过webpack 实现热更新 <br>
2. 实现了使用proxy + axios代理请求(既能隐藏请求域名,又能解决跨域) <br>
3. 配置了vue2.0+ + vue-router(hash/history mode) + vuex + axios
4. 启用vscode + eslint 实现代码格式化并且保存自动修复eslint

*** dev 环境 ***
使用 supervisor + node-express 启动服务 

*** production 环境 ***
使用 pm2 + node-express 启动服务

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
