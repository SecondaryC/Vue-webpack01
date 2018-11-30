<template>
    <div>
        <!--轮播-->
        <mt-swipe :auto="4000">
            <!--之后谁使用轮播图插件就需要传递一个swiperList的数据给轮播图子组件-->
            <mt-swipe-item v-for="item in swiperList" :key="item.id">
                    <img :src="item.img" :class="{'full':isFull}">
            </mt-swipe-item>
        </mt-swipe>

    </div>
</template>

<script>
    export default {
        name: "swiper",
        props:["swiperList","isFull"]
    }
</script>

<style scoped lang="scss">
    .mint-swipe {
        height: 200px;
        .mint-swipe-item {
            &:nth-child(1) {
                background-color: lightblue;
            }
            &:nth-child(2) {
                background-color: lightpink;
            }
            &:nth-child(3) {
                background-color: lightgreen;
            }
            img {
                width: 100%;
                height:100%;
            }
            .isFull{
                width: 100%;
            }
        }
    }
</style>