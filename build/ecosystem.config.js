/**
 * @author H_MZ
 * @description 服务器端通过pm2启动服务 配置文件
 */

module.exports = {
    apps: [
        // app process
        {
            name: 'vue-project-setup',
            script: './build/server.js',
            // 监控变化的目录，一旦变化，自动重启
            watch: [
                './build'
            ],
            // 排除监听文件
            'ignore_watch': [
                './logs'
            ],
            out_file: './logs/vue-project-setup.out.log',
            error_file: './logs/vue-project-setup.error.log',
            // 日志输出时间格式
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            // 异常重启时间间隔 每4s重启异常, 避免服务器频发重启
            restart_delay: 4000,
            // 服务占用的内存超过300M，会自动进行重启
            max_memory_restart: '300M'
            // 进程数，服务器是几个内核就启动几个服务。 设置0，自动根据服务器配置开启相应进程数
            // instances: 4,
            // exec_mode: 'cluster'
        }
    ]
};