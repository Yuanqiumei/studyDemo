<template>
    <div class="demo">
        <group>
            <x-switch title="标题1" v-model="show1"></x-switch>
            <x-switch title="标题2" v-model="show2"></x-switch>
        </group>
        <p>show1:{{show1}}</p>
        <p>show2:{{show2}}</p>

        <actionsheet
            v-model="show3" 
            :menus="menus3"
            @on-click-menu="click"
            @on-click-menu-delete="onDelete" 
            show-cancel  
            :close-on-clicking-mask="false">
        </actionsheet>
        <p>show3:{{show3}}</p>
        <button class="button" @click="backGo">Go Back</button>
    </div>
</template>


<script>

import { Loading,Alert,XSwitch,Actionsheet,Group } from 'vux'
export default {
    name: 'Demo',
    components: {Loading,Alert,XSwitch,Actionsheet,Group},
    data() {
        return {
           show1:true,          //根据值判断是否打开
　　　　    show2:false,
            show3: true,
            menus3: {'title.noop': '你确定删除吗?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>',          // 标题文本，必须必须使用 title.开头，并用''包裹
　　　　　　    delete: '<span style="color:red">删除</span>'                                                                                      //可以 包含HTML文本和样式，VUX会默认解析出来
　　　　      }
        }
    },
    mounted() {

    },
    methods: {
        click (key) {
    　　　　console.log(key)               //输出触发事件的对象 名称 delete
    　　},
    　　onDelete () {
    　　　　alert('触发了删除');
    　　},
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
