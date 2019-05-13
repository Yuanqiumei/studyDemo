<template>
    <div class="filter">
        <h3>
            两位小数：{{ firstTest | formatMoney}}
        </h3>
        <h3>
            全局过滤器，并在值后面添加属性值：{{ secondTest | Money('元')}}
        </h3>
        <h3>
            时间过滤器：{{ date | formatDate('YYYY-MM-DD HH:mm:ss') }}
        </h3>
        <button class="button" @click="backGo">Go Back</button>
    </div>
</template>

<script>

export default {
    name:'Filter',
    data() {
        return{
            firstTest: 20,
            secondTest:12,
            date: new Date(),
        }
    },
    filters: {
        //保留两位小数并添加￥符号的过滤器方法
        formatMoney(value) {
            return '￥' + value.toFixed(2);
        }
    },
    methods: {
        backGo () {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
button.button {
    outline: none;
    background-color: antiquewhite;
    border: 0;
    width: 100px;
    border-radius: 8px;
    line-height: 2em;
    font-size: larger;
    font-family: -webkit-pictograph;
}
</style>


