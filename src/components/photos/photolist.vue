<script src="../../index.js"></script>
<template>
    <div>
        <!--导航区域-->
        <div id="slider" class="mui-slider" data-slider="4">
            <div id="sliderSegmentedControl"
                 class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0?'mui-active':'']" href="#item1mobile"
                       v-for="item in cates" :key="item.id" @click="getPhotoListById(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!--图片列表   懒加载-->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="mesInfo">
                    <h1>{{item.title}}</h1>
                    <div class="zhaiyao">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.js"
    import {Toast} from "mint-ui"

    export default {
        name: "photolist",
        created() {
            this.getAllCategory();
            this.getPhotoListById(0);
        },
        data() {
            return {
                cates: [],/*村所有分类的列表数据*/
                list:[]/*存储图片和数组*/
            }

        },
        mounted() {/*钩子函数，加载之后挂载之前*/
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getAllCategory() {
                /*获取图片分类*/
                this.$http.get("api/getimgcategory").then(result => {
                    if (result.body.status === 0) {
                        /*手动拼接一个全部的分类列表*/
                        result.body.message.unshift({id: 0, title: "全部"});
                        this.cates = result.body.message;
                    } else {
                        Toast("获取失败")
                    }
                })
            },
            /*根据分类id获取图片列表*/
            getPhotoListById(cateid){
                this.$http.get("api/getimages/"+cateid).then(result=>{
                    console.log(result.body);
                    if(result.body.status===0){
                        this.list=result.body.message;
                    }
                    else {
                        Toast("获取图片列表失败");
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    * {
        touch-action: pan-y;
    }

    .photo-list{
        list-style: none;
        padding: 0 8px;
        margin: 0;
        li{
            background-color: #ccc;
            text-align: center;
            position: relative;
            box-shadow:0 0 9px #999;
            margin-bottom: 10px;
            img{
                width: 100%;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .mesInfo{
                text-align: left;
                color: #fff;
                position: absolute;
                bottom: 0;
                background-color: rgba(0,0,0,.4);
                max-height: 84px;
                h1{
                    font-size: 16px;
                }
                .zhaiyao{
                    font-size: 13px;
                }
            }
        }
    }
</style>