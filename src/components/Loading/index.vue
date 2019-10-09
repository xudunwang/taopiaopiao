<template>
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped>
    .loading{
        display: flex;
        width: 80px;
        height: 40px;
        margin: 0 auto;
        padding-top: 50%;
    }
    .loading span{
        align-self:center;
        flex: 1;
        display: inline-block;
        width: 5px;
        margin: 1px;
        height: 100%;
        border-radius: 4px;
        background: lightcoral;
        -webkit-animation: load 0.5s ease infinite;
    }
    @-webkit-keyframes load{
        0%,100%{
            height: 40px;
            width: 2px;
            background: lightcoral;
        }
        50%{
            height: 90px;
            margin: -50px 0;
            background: lightblue;
        }
    }
    .loading span:nth-child(2){
        -webkit-animation-delay:0.2s;
    }
    .loading span:nth-child(3){
        -webkit-animation-delay:0.4s;
    }
    .loading span:nth-child(4){
        -webkit-animation-delay:0.6s;
    }
    .loading span:nth-child(5){
        -webkit-animation-delay:0.8s;
    }
</style>