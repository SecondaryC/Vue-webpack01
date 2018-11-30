<h1>vue+mintUI+webpack项目---移动端APP</h1>

<h2>一,项目介绍</h2>
&nbsp;&nbsp;&nbsp;&nbsp;该项目包含home,member,shoppingCar,search四个主板面,通过底部的导航跳转,主要是通过component(组件)+router(路由)实现跳转,顶部是header头部信息,
设有后退键,通过$route.go(-1),实现后退.home中的跳转也是通过路由来实现的.


<h2>二,搭建基本框架</h2>
<h6>&nbsp;&nbsp;&nbsp;本项目需要配置webpack环境,可参考我的csdn博客:[配置webpack](https://blog.csdn.net/qq_42039281/article/details/84349077)</h6>

<h3>1,vue的导入</h3>
安装vue
1. 运行npm i vue -S将vue安装为运行依赖；
2. 运行npm i vue-loader vue-template-compiler -D将解析转换vue的包安装为开发依赖；
3. 由于新版本不支持. 可以下载指定版本  npm i vue-loader@14.2.2 -D
4. 运行npm i style-loader css-loader -D将解析转换CSS的包安装为开发依赖，因为.vue文件中会写CSS样式；
5. 在webpack.config.js中，添加如下module规则：


    module: {

        rules: [

          { test: /\.css$/, use: ['style-loader', 'css-loader'] },

          { test: /\.vue$/, use: 'vue-loader' }

        ]

      }



在index.js文件中导入vue
`import Vue from 'vue'`
在src文件夹下创建html,并创建vue节点
创建主模板:
在src文件夹下创建App.vue文件
在index中导入主模板
`import app from './App.vue'`

在index.js文件中创建vm对象:
    `let vm = new Vue({
        el:'#app',
        data:{},
        methods:{},
        render: c => c(app) //将主模板渲染至页面
        })`


做完上面的这些,可以测试一下,vue和主模板是否导入成功,可以在App.vue主模板中的tempalte标签添加`<div>环境搭建</div>`
测试.`$ cnpm run dev` 运行项目

<h3>2,header区域</h3>
header区域需要使用到mint-ui
安装mint-ui
`cnpm i mint-ui -S`
index.js中导入mint-ui
`import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'`
index.js中安装mint-ui
`Vue.use(MintUI);`

下面我们就可以在主模板中引用mint-ui中的样式[header样式](http://mint-ui.github.io/docs/#/zh-cn2/header)


<h3>3,底部导航搭建
底部的bar需要用到mui中的样式需要导入mui
在src文件夹下创建lib文件夹,导入mui的包
在index中导入mui的css样式
`import'./lib/mui/css/mui.css'`
下面我们就可以在主模板中引入mui中的样式[找到tab bar](http://dev.dcloud.net.cn/mui/)

接下来更改样式,更改字体图标时,会用到扩展字体图标 需要下载icons-extra.css和mui-icons-extra.ttf,分别放到mui
包下面的css,font文件夹中,然后在index.js中引入css样式 `import './lib/mui/css/icons-extra.css'`

<h3>3,安装路由</h3>

1,安装路由
`cnpm i vue-router -S`
2,导入路由模板:
`import VueRouter from 'vue-router'`
3,安装路由模板

 >><code>Vue.use(VueRouter);</code>




4,在src中创建 components>tabBar 文件夹组合,在tabBar文件夹中创建路由组件home.vue , member.vue , shoppingCar.vue , search.vue ;并在路由组件中添加内容

5,在src下创建router文件,导入路由包`import VueRouter from 'vue-router'` 导入路由组件,创建路由对象,将路由暴露

    //导入路由组件
    import home from './components/tabbar/home.vue'
    import member from './components/tabbar/Member.vue'
    import shoppingCar from './components/tabbar/shoppingCar.vue'
    import search from './components/tabbar/search.vue'
    //创建路由对象
    var router = new VueRouter({
        routes:[
            {path:'/',redirect:'/home'},
            {path:'/home',component:home},
            {path:'/member',component:member},
            {path:'/shoppingCar',component:shoppingCar},
            {path:'/search',component:search},
        ],
        //到路由出去活跃时添加该类样式
        linkActiveClass:'mui-active'
    });
    //把路由对象暴露出去
    export default router

6,在index.js中引入router,并将路由挂载在Vue节点上
`//导入自己的router路由
 import router from './router.js'`

    //创建vm实例
    let vm = new Vue({
        el:'#app',
        data:{},
        methods:{},
        //利用render渲染
        render: c => c(app),
        router//挂载路由
    });
