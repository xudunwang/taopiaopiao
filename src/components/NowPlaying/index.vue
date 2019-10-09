<template>
    <div class="movie_body" ref="movie_body">
        <Loading v-if="isLoading"/>
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <li class="pullDown"><span>{{pullDownMsg}}</span></li>
                <li v-for="item in movieList" v-if="item.sc !==0" :key="item.id" @tap="handleToDetail(item.id)">
                    <div class="pic_show"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2>{{item.nm}}<span v-if="item.version">({{item.version.replace(/v/g,'').replace(/imax/g,'IMAX').replace(/d/g,'D')}})</span>
                        </h2>
                        <p>观众评 <span class="grade">{{item.sc}}</span></p>
                        <p>主演: {{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>

    // import BScroll from  'better-scroll';

    export default {
        name: "NowPlaying",
        data() {
            return {
                movieList: [],
                pullDownMsg: '',
                isLoading: true,
                prevCityId: -1
            }
        },
        // activated,这个生命周期只有在有keep-alive的情况下能够使用
        activated() {
            //切换完城市需要重新请求数据，但是除了切换城市以外，是不走生命周期的，ajax
            let cityId = this.$store.state.city.id;
            //如果切换了城市就走下一步，没有就直接返回当前值
            if (this.prevCityId === cityId) {
                return;
            }
            this.loading == true;
            console.log(123);
            this.axios.get('/api/movieOnInfoList?cityId=' + cityId).then((res) => {
                let msg = res.data.msg;
                if (msg === 'ok') {
                    this.movieList = res.data.data.movieList;
                    //加载动画组件
                    this.isLoading = false;
                    //切换城市id
                    this.prevCityId = cityId;
                    console.log("如果您看到此消息，感谢您。我叫徐达，一名热爱前端开发的2020届毕业的在读大学生，希望充满工作热情的我能为未来的贵公司服务，一起共创美好的未来！" +
                        "欢迎随时联系我！我的联系电话：15797957823  邮箱：xuda97email@163.com")
                }
            });
        },
        methods: {
            handleToDetail(movieId) {
                // console.log(movieId);
                this.$router.push('/movie/detail/1/'+movieId)
            },
            handleToScroll(pos) {
                if (pos.y > 30) {
                    this.pullDownMsg = '正在刷新······'
                    // console.log(this);
                }
            },
            handleToTouchEnd(pos) {
                if (pos.y > 30) {
                    this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
                        let msg = res.data.msg;
                        if (msg === 'ok') {
                            this.pullDownMsg = '加载成功';
                            setTimeout(() => {
                                this.movieList = res.data.data.movieList;
                                this.pullDownMsg = ''
                            }, 800);
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #content .movie_body {
        flex: 1;
        overflow: auto;
    }

    .movie_body ul {
        margin: 0 12px;
        overflow: hidden;
    }

    .movie_body ul li {
        margin-top: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px #e6e6e6 solid;
        padding-bottom: 10px;
    }

    .movie_body .pic_show {
        width: 64px;
        height: 90px;
    }

    .movie_body .pic_show img {
        width: 100%;
    }

    .movie_body .info_list {
        margin-left: 10px;
        flex: 1;
        position: relative;
    }

    .movie_body .info_list h2 {
        font-size: 17px;
        line-height: 24px;
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .movie_body .info_list p {
        font-size: 13px;
        color: #666;
        line-height: 22px;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .movie_body .info_list .grade {
        font-weight: 700;
        color: #faaf00;
        font-size: 15px;
    }

    .movie_body .info_list img {
        width: 50px;
        position: absolute;
        right: 10px;
        top: 5px;
    }

    .movie_body .btn_mall, .movie_body .btn_pre {
        width: 47px;
        height: 27px;
        line-height: 28px;
        text-align: center;
        background-color: #f03d37;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
    }

    .movie_body .btn_pre {
        background-color: #3c9fe6;
    }

    .movie_body .pullDown {
        display: flex;
        margin: 0;
        padding: 0;
        border: none;
        line-height: 50px;
        text-align: center;
        color: #333333;
    }

    .movie_body .pullDown span {
        flex: 1;
    }
</style>