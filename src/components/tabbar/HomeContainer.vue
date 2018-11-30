<template>
    <div>
        <!--轮播-->
        <swiper :swiperList="list" :isFull="true"></swiper>

        <!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newlist">
                    <img src="../../images/menu1.png">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../images/menu2.png">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../images/menu3.png">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home">
                    <img src="../../images/menu4.png">
                    <div class="mui-media-body">手机支付</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home">
                    <img src="../../images/menu5.png">
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home">
                    <img src="../../images/menu6.png">
                    <div class="mui-media-body">查看更多</div>
                </router-link>
            </li>
        </ul>
        <!--六宫格结束-->


    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import swiper from "../subcomponents/swiper.vue"

    export default {
        name: "HomeContainer",
        data() {
            return {
                list: []
            }
        },
        created() {
            this.getShuffling();
        },
        methods: {
            getShuffling() {/*获取轮播图*/
                this.$http.get("api/getlunbo").then((result) => {
                    /*console.log(result.body)*/
                    if (result.body.status === 0) {
                        /*Toast("轮播加载成功");*/
                        this.list = result.body.message;
                    } else {
                        Toast("轮播加载失败");
                    }
                })
            }
        },
        components:{
            swiper
        }
    }
</script>

<style scoped lang="scss">
    .mui-table-view.mui-grid-view.mui-grid-9 {
        background-color: #fff;
        img {
            width: 60px;
            height: 60px;
        }
        .mui-media-body {
            font-size: 13px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
    }
</style>