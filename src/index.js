import Vue from "vue"
/*导入主模板*/
import app from "./App.vue"
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import VueRouter from  "vue-router"
Vue.use(VueRouter);
import router from  "./router.js"

import VueResource from "vue-resource"
Vue.use(VueResource);

Vue.use(MintUI);

/*设置数据根路径*/
Vue.http.options.root="http://www.liulongbin.top:3005";

/*定义全局过滤器*/
import moment from "moment"
Vue.filter("dateFormat",function (dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
});
/*导入缩略图插件*/
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


let vm=new Vue({
    el:"#first",
    data:{},
    methods:{},
    render:(c)=>c(app),
    router
});