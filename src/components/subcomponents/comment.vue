<template>
    <div class="cmt-container">
        <h4>发表评论</h4>
        <hr>
        <textarea placeholder="请输入内容（最多输入120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <!--获取评论-->
        <div class="cmt-list">
            <!--v-for循环的i表示楼层-->
            <div class="cmt-item" v-for="(item,i) in comment" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_nameh}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content=="undefined"?"这个人没有发表评论":item.content}}
                </div>
            </div>
        </div>

        <!--加载更多按钮-->
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

    </div>
</template>

<script>
    import {Toast} from "mint-ui"

    export default {
        name: "comment",
        data() {
            return {
                pageIndex: 1, /*默认显示评论的第一页*/
                comment: [], /*用于存放获取所有的数据*/
                msg: ""
            }
        },
        created() {
            this.getComment();
        },
        methods: {
            getComment() {
                /*获取评论*/
                this.$http.get("api/getcomments/" + this.parentId + "?pageindex=" + this.pageIndex).then(result => {
                    if (result.body.status === 0) {
                        console.log(result.body.message);
                        /*每次点击加载更多平论时，刷新出来的新评论不要覆盖旧的评论*/
                        this.comment = this.comment.concat(result.body.message)
                        /*把从后台获取的数据渲染赋值给定义好的空数组*/
                    } else {
                        Toast("获取评论失败");
                    }
                });
            },
            getMore() {/*点击按钮加载更多评论*/
                this.pageIndex++;
                this.getComment();
            },
            postComment() {
                /*校验输入评论内容是否为空*/
                if(this.msg.trim().length===0){
                    return Toast("评论内容不能为空");
                }
                this.$http.post("api/postcomment/"+this.$route.params.id,{content:this.msg.trim()}).then(result=>{
                    if(result.body.status===0){
                        var cmt={/*新发表的评论需要插入到原本数据中，提交的内容包括用户名，提交时间，提交内容*/
                            user_name:"匿名用户",
                            add_time:Date.now(),
                            content:this.msg.trim()
                        }
                        this.comment.unshift(cmt);/*通过unshift()方法将发表的新内容插入到当前数据中*/
                        this.msg=""/*清空文本域中内容*/
                    }
                });
            }
        },
        props: ["parentId"]
    }
</script>

<style scoped lang="scss">
    .cmt-container {
        h4 {
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list {
            font-size: 13px;
            margin: 8px 0;
            .cmt-item {
                .cmt-title {
                    background-color: #ccc;
                    line-height: 30px;
                }
                .cmt-body {
                    text-indent: 2em;
                    line-height: 35px;
                }
            }
        }
    }
</style>