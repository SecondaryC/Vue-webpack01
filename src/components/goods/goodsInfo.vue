<template>
    <div>
        <!--轮播图部分-->
        <div class="mui-card">
            <div class="mui-card-content">
                <!--将子组件的轮播图插件传给父组件的数组中-->
                <swiper :swiperList="goodsShuffling" :isFull="false"></swiper>
            </div>
        </div>

        <!--商品购买模块-->
        <div class="mui-card">
            <div class="mui-card-header">页眉</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
                </div>
            </div>
            <div class="mui-card-footer">页脚</div>
        </div>

        <!--商品参数模块-->
        <div class="mui-card">
            <div class="mui-card-header">页眉</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import swiper from "../subcomponents/swiper.vue"
    export default {
        name: "goodsInfo",
        data(){
            return{
                id:this.$route.params.id,/*将参数中的id挂载到data中*/
                goodsShuffling:[]/*用于存储轮播图数据*/
            }
        },
        created(){
          this.getShuffling();
        },
        methods:{
            /*获取轮播数据*/
            getShuffling(){
                this.$http.get("api/getthumimages/"+this.id).then(result=>{
                    if(result.body.status===0){
                        /*现循环轮播图数组每一项，为item添加img属性，因为轮播图组件中只有item.img,没有item.src*/
                        result.body.message.forEach(item=>{
                            item.img=item.src;/*将此处的item.src赋值给item.img，便于调用轮播图插件时可以获取到图片数据*/
                        });
                        this.goodsShuffling=result.body.message;
                    }
                })
            }
        },
        components:{
            swiper
        }
    }
</script>

<style scoped>

</style>