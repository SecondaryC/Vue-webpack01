<template>
    <div class="containerInfo">

            <h3 class="title">{{list.title}}</h3>
            <p class="subtitle">
                <span>发表时间：{{list.add_time|dateFormat}}</span>
                <span>点击：{{list.click}}次</span>
            </p>
        <hr>

        <!--内容区域-->
        <div v-html="list.content">newsInfo.content</div>

        <!--子组件评论区域-->
        <comment-box :parentId="id"></comment-box>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"
    /*导入子组件*/
    import comment from "../subcomponents/comment.vue"

    export default {
        name: "NewsInfo",
        data() {
            return {
                id: this.$route.params.id,
                list:{}
            }
        },
        created(){
            this.getNewsInfo()
        },
        methods:{
            getNewsInfo(){
                this.$http.get("api/getnew/"+this.id).then(result=>{
                    console.log(result.body);
                    if(result.body.status===0){
                        this.list=result.body.message[0];
                    }else{
                        Toast("获取新闻详情失败")
                    }
                })
            }
        },
        components:{
            /*注册组侧子组件节点*/
            "comment-box":comment
        }
    }
</script>

<style scoped lang="scss">
    .containerInfo{
        padding: 5px 5px;
        h3{
            color: red;
            font-size: 16px;
            line-height:30px;
        }
        p{
            color: #226aff;
            display: flex;
            justify-content: space-between;

        }
    }
</style>