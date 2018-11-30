<template>
    <div class="goods_list">

<!--
        <router-link class="goods-item" v-for="item in goodsLists" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url">
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <div class="price">
                    <span class="nowPrice">￥{{item.sell_price}}</span>
                    <span class="oldPrice">￥{{item.market_price}}</span>
                </div>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </div>
            </div>
        </router-link>
-->

        <!--网页中的跳转方式
            1.a标签跳转   ====标签跳转
            2.window.localtion.hrer跳转    =====编程式导航
        -->
        <div class="goods-item" v-for="item in goodsLists" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url">
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <div class="price">
                    <span class="nowPrice">￥{{item.sell_price}}</span>
                    <span class="oldPrice">￥{{item.market_price}}</span>
                </div>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"
    export default {
        name: "goodsList",
        data(){
            return{
                pageIndex:1,/*默认显示第一页*/
                goodsLists:[]
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            /*获取商品列表*/
            getGoodsList(){
               this.$http.get("api/getgoods?pageindex="+this.pageIndex).then(result=>{
                   if(result.body.status===0){
                       if(result.body.message.length===0){
                           return Toast("没有更多商品了");
                       }
                       this.goodsLists=this.goodsLists.concat(result.body.message);
                   }
               })
            },
            getMore(){/*加载更多*/
                this.pageIndex++;
                this.getGoodsList()
            },
            goDetail(id){/*跳转到详情页面(使用js方式完成)*/
                /*都是this下的对象
                1.$route是路由的参数对象，路由中的所有参数数：params、query都属于他
                2.$router是路由的导航对象，可以方便的使用js代码实现前进后退，跳转到新的url地址*/
                // this.$router.push("/home/goodsinfo/"+id);
                this.$router.push({name:"goodsinfo",params:{id}})/*传递命名路由方式*/
            }
        }
    }
</script>

<style scoped lang="scss">
    .goods_list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 5px;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 3px 0;
            padding: 2px;
            min-height: 293px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                color:#8f8f94 ;
                .price{
                    .nowPrice{
                        color: red;
                       font-size: 16px;
                        font-weight: 700;
                    }
                    .oldPrice{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 15px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>