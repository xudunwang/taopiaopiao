<template>
    <div class="wrapper" ref="wrapper">
        <slot>

        </slot>
    </div>
</template>

<script>

    import BScroll from 'better-scroll';

    export default {
        name: "Scroller",
        props: {
            handleToScroll: {
                type: Function,
                default: function () {

                }
            },
            handleToTouchEnd: {
                type: Function,
                default: function () {

                }
            }
        },
        mounted() {
            let scroll = new BScroll(this.$refs.wrapper, {
                tap: true,
                probeType: 1
            });
            this.scroll = scroll;
            //添加父组件两个方法
            scroll.on('scroll', (pos) => {
                //回调pos出去
                this.handleToScroll(pos);
            });
            scroll.on('scroll', (pos) => {
                this.handleToTouchEnd(pos);
            })
        },
        methods: {
            toScrollTop(y) {
                this.scroll.scrollTo(0, y);
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        height: 100%;
    }
</style>