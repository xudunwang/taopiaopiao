<template>
    <div id="main">
        <Header title="淘影院"/>
        <div id="content">
            <div class="cinema_menu">
                <router-link tag="div" to="/cinema/city" class="city_switch">
                    {{$store.state.city.nm}} <i class="iconfont icon-lower-triangle"></i>
                </router-link>
                <router-link tag="div" to="/cinema/wholeCity" class="brand_swtich">
                    全城
                </router-link>
                <router-link tag="div" to="/cinema/brand" class="feature_switch">
                    附近
                </router-link>
            </div>
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>

        <TabBar/>

    </div>
</template>

<script>

    import Header from '@/components/Header';
    import TabBar from '@/components/TabBar'

    export default {
        name: "Cinema",
        components: {
            Header,
            TabBar,
        }
    }
</script>

<style scoped>
    #content .cinema_menu {
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: white;
    }
    .brand_swtich{
        margin-left: -8%;
        font-size: 1.2em;
        font-weight:bold;
        color: #555555;
    }
   .brand_swtich:hover{
        font-size: 1.4em;
        color: #e54847;
    }
    .feature_switch{
        font-size: 1.2em;
        font-weight:bold;
        color: #555555;
        margin-left: -5%;
    }
    .feature_switch:hover{
        font-size: 1.4em;
        color: #e54847;
    }
    .city_switch:hover{
        color: #e54847;
    }

</style>