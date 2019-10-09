<template>
    <div id="detailContrainer" class="slideEnter">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handeleToBack"></i>
        </Header>
        <Loading v-if="isLoading"/>
        <div v-else id="content" class="contentDetail">
            <div class="detail_list">
                <div class="detail_list_bg"></div>
                <div class="detail_list_filter"></div>
                <div class="detail_list_content">
                    <div class="detail_list_img">
                        <img :src="detailMovie.img | setWH('170.250')" alt="">
                    </div>
                    <div class="detail_list_info">
                        <h2>{{detailMovie.nm}}</h2>
                        <p>{{detailMovie.enm}}</p>
                        <p>{{detailMovie.sc}}</p>
                        <p>{{detailMovie.cat}}</p>
                        <p>{{detailMovie.src}}/{{detailMovie.dur}}</p>
                        <p>{{detailMovie.pubDesc}}</p>
                    </div>
                </div>
            </div>
            <div class="detail_intro">
                <p>{{detailMovie.dra}}</p>
            </div>
            <div class="detail_useless">
                <p>剧照</p>
            </div>
            <div class="detail_player swiper-container" ref="detail_player">
                <ul class="swiper-wrapper">
                    <li v-for="(item,index) in detailMovie.photos " :key="index" class="swiper-slide">
                        <div>
                            <img :src="item| setWH('140.70')" alt="">
                        </div>
                    </li>
                </ul>
            </div>



            <!--            <div class="vid-f">-->
            <!--                <p>{{detailMovie.videoName}}</p>-->
            <!--                <div class="vid-c"><video class="vid" :src="detailMovie.videourl"></video></div>-->

            <!--        </div>-->
        </div>
        <div id="buttomC">
            <router-link tag="div" to="/cinema/brand" class="buttonCinema">
                选择影院
            </router-link>
        </div>
    </div>

</template>

<script>

    import Header from '@/components/Header';

    export default {
        name: "Detail",
        data() {
            return {
                detailMovie: {},
                isLoading: true
            }
        },
        components: {
            Header
        },
        props: ['movieId'],
        methods: {
            handeleToBack() {
                this.$router.back();
            }
        },
        mounted() {
            // console.log(this.movieId);
            this.axios.get('/api/detailmovie?movieId=' + this.movieId).then((res) => {
                let msg = res.data.msg;
                if (msg === 'ok') {
                    console.log(res);
                    this.detailMovie = res.data.data.detailMovie;
                    this.isLoading = false
                    //需要等swiper资源加载完，所以用$nextTick
                    this.$nextTick(() => {
                        new Swiper(this.$refs.detail_player, {
                            slidesPerView: 'auto',
                            freeMode: true,
                            freeModeSticky: true
                        });
                    })
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    #detailContrainer {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99;
        width: 100%;
        min-height: 100%;
        background-color: #ffffff;
    }

    .slideEnter {
        animation: .2s slideMove;
    }

    @keyframes slideMove {
        0% {
            transform: translateX(100%)
        }
        100% {
            transform: translateX(0)
        }
    }

    #content.contentDetail {
        display: block;
        margin-bottom: 60px;
    }

    #content .detail_list {
        height: 200px;
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .detail_list .detail_list_bg {
        width: 100%;
        height: 100%;
        background: url(../../../public/images/movie_1.jpg) 0 40%;
        filter: blur(20px);
        background-size: cover;
        position: absolute;
        left: 0;
        top: 0;
    }

    .detail_list .detail_list_filter {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #40454d;
        opacity: .55;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }

    .detail_list .detail_list_content {
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
    }

    .detail_list .detail_list_img {
        width: 108px;
        height: 150px;
        border: solid 1px #f0f2f3;
        margin: 20px;
    }

    .detail_list .detail_list_img img {
        width: 100%;
        height: 100%;
    }

    .detail_list .detail_list_info {
        margin-top: 20px;
    }

    .detail_list .detail_list_info h2 {
        font-size: 20px;
        color: white;
        font-weight: normal;
        line-height: 40px;
    }

    .detail_list .detail_list_info p {
        display: block;
        color: white;
        line-height: 20px;
        font-size: 14px;
        color: #ccc;
    }

    #content .detail_intro {
        padding: 10px;
        line-height: 35px;
        text-indent:2em;
    }

    #content .detail_player {
        margin: 20px;
    }

    .detail_useless{
        border-top: 1px #ebe8e3 solid;
        margin-top: 5px;
    }

    .detail_useless p{
        margin-left: 10%;
        margin-top: 10px;
        font-size: 1.3em;
        color: #555555;
    }

    .detail_player .swiper-slide {
        width: 70px;
        margin-right: 20px;
        text-align: center;
        font-size: 14px;
    }

    .detail_player .swiper-slide img {
        width: 100%;
        height: 50px;
        margin-bottom: 5px;
    }

    .detail_player .swiper-slide p:nth-of-type(2) {
        color: #999;
    }

    /*.vid-f{
            display: flex;
            width:100%;
        }
    .vid-c{}
    .vid-f .vid{
        display: inline-block;
        width:100%;
        margin-top: -25%;
        flex: 1;
    }*/

    #buttomC {
        width: 100%;
        height: 50px;
        background: white;
        border-top: 1px #ebe8e3 solid;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 99
    }

    .buttonCinema {
        margin: 0 auto;
        margin-top: 5px;
        border-radius:20px;
        width: 90%;
        height: 40px;
        background:linear-gradient(to right,#e54847,#f40);
        line-height: 40px;
        text-align: center;
        color: white;
    }

</style>