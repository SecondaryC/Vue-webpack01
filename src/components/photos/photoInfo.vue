<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time|dateFormat}}</span>
            <span>点击次数:{{photoinfo.click}}次</span>
        </p>
        <hr>

        <!--缩略图区域-->
        <vue-preview :slides="photoList" @close="handleClose"></vue-preview>

        <!--图片内容区域-->
        <div class="content" v-html="photoinfo.content"></div>

        <!--评论子组件-->
        <cmt-box :parentId="id"></cmt-box>
    </div>
</template>

<script>
    import comment from "../subcomponents/comment.vue"
    export default {
        name: "photoInfo",
        data(){
            return{
                id:this.$route.params.id,
                photoinfo:{},
                photoList:[]/*存储缩略图*/
            }
        },
        created(){
            this.getPhotoInfo();
            this. getThumbs();
        },
        methods:{
            /*获取图片详情*/
            getPhotoInfo(){
                this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                    if(result.body.status===0){
                        this.photoinfo=result.body.message[0]
                    }
                    else {

                    }
                })
            },
            /*关闭缩略图*/
            handleClose () {
                console.log('close event')
            },
            /*获取缩略图*/
            getThumbs(){
                this.$http.get("api/getthumimages/"+this.id).then(result=>{
                    if (result.body.status===0) {
                        /*给数组赋值之前，需要给数据添加缩略图数据
                        *需遍历每一个图片数据，不全图片宽高和小图片 */
                        result.body.message.forEach(item=>{
                            item.msrc=item.src;
                            item.w=600;
                            item.h=400;
                        })
                        this.photoList=result.body.message;
                    }
                })
            }
        },
        components:{
            "cmt-box":comment
        }
    }
</script>

<style lang="scss">
    .photoinfo-container{
        padding: 7px;
        h3{
            color: #26a2ff;
            font-size: 13px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;/*此标签中的内容左右分布*/
        }
        .content{
            font-size:13px;
            line-height: 30px;
        }
        figure{
            display: inline-block;
            img{
                width: 88px;
                height: 58px;
            }
        }
    }

</style>