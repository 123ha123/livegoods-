const { createProxyMiddleware } = require('http-proxy-middleware');
//一定要在src文件下配置此文件
//配置资源后要重启项目

module.exports = function (app) {
    app.use('/api',createProxyMiddleware({  // 配置资源后，/api就等于https://www.qyer.com ，访问接口时就直接写/api/...
            target: 'http://localhost:4000',  //target访问域名 ---跨域
            changeOrigin: true,   //允许跨域
            pathRewrite:{  //路径重定向  开头是/api 的替换地址空
                '^/api':''
            }
        })
    )
    app.use('/boo',createProxyMiddleware({  // 配置资源后，/api就等于https://www.qyer.com ，访问接口时就直接写/api/...
        target: 'http://m.youtx.com',  //target访问域名 ---跨域
        changeOrigin: true,   //允许跨域
        pathRewrite:{  //路径重定向  开头是/app 的替换地址空
            '^/boo':''
        }
    })
)


    
};