<template>
    <div class="city_body">

        <!--        热门城市-->
        <div class="city_list">
            <Loading v-if="isLoading"/>
            <Scroller v-else ref="city_List">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">
                                {{item.nm}}
                            </li>
                        </ul>
                    </div>
                    <!--        城市分类-->
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityList" :key="item.index">
                            <h2>{{item.index}}</h2>
                            <ul>
                                <li v-for="itemList in item.list" :key="itemList.id"
                                    @tap="handleToCity(itemList.nm,itemList.id)">{{itemList.nm}}
                                    <div class="bd-t"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>
        </div>
        <!--            索引-->
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">
                    {{item.index}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "City",
        data() {
            return {
                cityList: [],
                hotList: [],
                isLoading: true
            }
        },
        activated() {
            //将cityList和hotList存入本地localStorage
            let cityList = window.localStorage.getItem('cityList');
            let hotList = window.localStorage.getItem('hotList');

            if (cityList && hotList) {
                this.cityList = JSON.parse(cityList);
                this.hotList = JSON.parse(hotList);
                this.isLoading = false;
            } else {
                this.axios.get('/api/cityList').then((res) => {
                    let msg = res.data.msg;
                    if (msg === 'ok') {
                        this.isLoading = false;
                        let data = res.data.data.cities;
                        // [{ index : 'A',list :[{nm : '阿城',id : 123}] }]将数据改成这样的格式，方便渲染
                        let {cityList, hotList} = this.formatCityList(data);
                        this.cityList = cityList;
                        this.hotList = hotList;
                        //本地存储
                        window.localStorage.setItem('cityList', JSON.stringify(cityList));
                        window.localStorage.setItem('hotList', JSON.stringify(hotList));
                    }
                });
            }
        },
        methods: {
            formatCityList(cities) {
                let cityList = [];
                let hotList = [];

                //热门城市
                for (let i = 0; i < cities.length; i++) {
                    if (cities[i].isHot === 1) {
                        hotList.push(cities[i]);
                    }
                }

                // 数据push
                for (let i = 0; i < cities.length; i++) {
                    let firstLetter = cities[i].py.substring(0, 1).toUpperCase();
                    if (toCom(firstLetter)) {//新添加index索引
                        cityList.push({index: firstLetter, list: [{nm: cities[i].nm, id: cities[i].id}]});
                    } else {//累加到已有index索引中
                        for (let j = 0; j < cityList.length; j++) {
                            if (cityList[j].index === firstLetter) {
                                cityList[j].list.push({nm: cities[i].nm, id: cities[i].id});
                            }
                        }
                    }
                }
                //城市首字母排序
                cityList.sort((n1, n2) => {
                    if (n1.index > n2.index) {
                        return 1;
                    } else if (n1.index < n2.index) {
                        return -1;
                    } else {
                        return 0;
                    }
                });

                //首字母填入数据
                function toCom(firstLetter) {
                    for (let i = 0; i < cityList.length; i++) {
                        if (cityList[i].index === firstLetter) {
                            return false;
                        }
                    }
                    return true
                }

                // console.log(cityList);
                // console.log(hotList);
                return {
                    cityList,
                    hotList
                };
            },
            handleToIndex(index) {
                var h2 = this.$refs.city_sort.getElementsByTagName('h2');
                // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
                this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
            },
            //切换城市
            handleToCity(nm, id) {
                this.$store.commit('city/CITY_INFO', {nm, id});
                window.localStorage.setItem('nowNm', nm);
                window.localStorage.setItem('nowId', id);
                //将更新页面跳转到nowPlaying或者wholeCity
                if (this.$router.history.current.path === '/movie/city') {
                    this.$router.push('/movie/nowPlaying');
                } else if (this.$router.history.current.path === '/cinema/city') {
                    this.$router.push('/cinema/wholeCity');
                }
                // console.log(this.$router);
            }
        }
    }
</script>

<style scoped>
    #content .city_body {
        margin-top: 45px;
        display: flex;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
    }

    .city_body .city_list {
        flex: 1;
        overflow: auto;
        background: #fdfdfd;
    }

    .city_body .city_list::-webkit-scrollbar {
        background-color: transparent;
        width: 0;
    }

    .city_body .city_hot {
        margin-top: 20px;
    }

    .city_body .city_hot h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #F0F0F0;
        font-weight: normal;
    }

    /*.city_body .city_hot ul{}*/
    .city_body .city_hot ul li {
        float: left;
        background: #fff;
        width: 29%;
        height: 33px;
        margin-top: 15px;
        margin-left: 3%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        box-sizing: border-box;
    }

    /*.city_body .city_sort{}*/
    .city_body .city_sort div {
        margin-top: 20px;
    }

    .city_body .city_sort h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #F0F0F0;
        font-weight: normal;
    }

    .city_body .city_sort ul {
        margin-top: 10px;
        background-color: #ffffff;
    }

    .city_body .city_sort ul li {
        margin-left: 20px;
        line-height: 40px;
    }

    .bd-t {
        position: relative;
    }

    .bd-t::after {
        content: " ";
        position: absolute;
        left: 0;
        top: -10px;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(0deg, transparent 50%, #e0e0e0 50%);
    }

    .city_body .city_index {
        width: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        border-left: 1px #e6e6e6 solid;
        opacity: .5
    }
</style>