import VueRouter from "vue-router"

import HomeContainer from "./components/tabbar/HomeContainer.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import Shopcar from "./components/tabbar/Shopcar.vue"
import NewsList from "./components/news/NewsList.vue"
import NewsInfo from "./components/news/NewsInfo.vue"
import PhotoList from "./components/photos/photolist.vue"
import PhotoInfo from "./components/photos/photoInfo.vue"
import goodsList from "./components/goods/goodsList.vue"
import goodsInfo from "./components/goods/goodsInfo.vue"


//创建路由对象
let router=new VueRouter({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component: HomeContainer},
        {path:"/member",component: MemberContainer},
        {path:"/shopcar",component: Shopcar},
        {path:"/search",component: SearchContainer},
        {path:"/home/newlist",component: NewsList},
        {path:"/home/newsInfo/:id",component: NewsInfo},
        {path:"/home/photolist",component: PhotoList},
        {path:"/home/photoInfo/:id",component: PhotoInfo},
        {path:"/home/goodslist",component: goodsList},
        {path:"/home/goodsinfo/:id",component: goodsInfo,name:"goodsinfo"}
    ],
    linkActiveClass:"mui-active"
});

export  default router