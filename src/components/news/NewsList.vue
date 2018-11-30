<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
                <router-link :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h3 data-v-ac12f38c="">{{item.title}}}</h3>
                        <p data-v-ac12f38c class="mui-ellipsis">
                            <span data-v-ac12f38c="">发表时间: {{item.add_time|dateFormat}}</span>
                            <span data-v-ac12f38c="">点击次数:{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"

    export default {
        name: "NewsList",
        data(){
            return{
               list:[]
            }
        },
        created(){
            this.getNewsList();
        },
        methods:{
            getNewsList(){
                this.$http.get("api/getnewslist").then(result=>{
                    /*console.log(result.body)*/
                    if (result.body.status===0) {
                        this.list=result.body.message;
                    }
                    else{
                        Toast("获取新闻失败");
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .mui-table-view{
        h3{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;/*两个span标签两段对齐*/
        }
    }
</style>