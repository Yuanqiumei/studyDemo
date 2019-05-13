<template>
    <div class="car" v-cloak >
        <div id="cart">
            <section class="cartMain">
                <div class="cartMain_hd">
                    <ul class="order_lists cartTop">
                        <li class="list_chk">
                            <!--所有商品全选-->
                            <input type="checkbox" id="all" class="whole_check">
                            <label for="all" :class="{'check' : checkAll}" @click="cartchoose()"></label> 
                            全选
                        </li>
                        <li class="list_con">商品信息</li>
                        <li class="list_price">单价</li>
                        <li class="list_amount">数量</li>
                        <li class="list_sum">金额</li>
                        <li class="list_op">操作</li>
                    
                    </ul>
                </div>

                <div class="cartBox" >
                    <div class="order_content">
                        <ul class="order_lists" v-for="(pro,index) in list" :key="index">
                            <li class="list_chk">
                                <input type="checkbox" id="checkbox_2" class="son_check">
                                <label for="checkbox_2"  :class="{'check': pro.checked }" @click="choose(pro)"></label>
                            </li>
                            <li class="list_con">
                                <div class="list_text">
                                    <a href="javascript:;">{{pro.text}}</a>
                                </div>
                            </li>
                            <li class="list_price">
                                <p class="price">{{pro.price  | formatMoney}}</p>
                            </li>
                            <li class="list_amount">
                                <div class="amount_box">
                                    <a  class="reduce reSty" @click="changeMoney(pro,-1)">-</a>
                                    <input type="text" v-model="pro.num" class="sum">
                                    <a  class="plus" @click="changeMoney(pro,1)">+</a>
                                </div>
                            </li>
                            <li class="list_sum">
                                <p class="sum_price">{{pro.num*pro.price | formatMoney}}</p>
                            </li>
                            <li class="list_op">
                                <p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>
                            </li>
                        </ul>
                    </div>
                </div> 
            <!-- 底部 -->

            <div class="bar-wrapper">
                    <button class="button" @click="backGo">Go Back</button>
                <div class="bar-right">
                    <div class="totalMoney">共计: <strong class="total_text">{{totalPrice  | formatMoney}}</strong></div>
                    <div class="calBtn" @click="showDialogStyle = false"><a href="javascript:;">结算</a></div>
                </div>
            </div>
            
            </section>
             <div v-transfer-dom>
                <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
                    <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
                    <span style="font-size:30px;">HELLO WORLD</span>
                    <br>
                    <br>
                    <x-icon type="ios-close-outline" style="fill:#fff;"></x-icon>
                    </p>
                </x-dialog>
            </div>
        </div>
    </div>
</template>


<script>
import { XDialog, XButton, Group, XSwitch, TransferDomDirective as TransferDom } from 'vux'
export default {
    name: 'Car',
    directives: {
        TransferDom
    },
    components: {
        XDialog,
        XButton,
        Group,
        XSwitch
    },
    data() {
        return{
            type: "",
            checkAll: false,
            list:[
                {
                    pro_id:101,
                    text:'洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶',
                    price:480,
                    num:1
                },
                {
                    pro_id:201,
                    text:'剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀',
                    price:580,
                    num:1
                },
            ],
            totalPrice: 0,
            showDialogStyle: false
        }
    },
    //价格过滤器
    filters: {
        //保留两位小数并添加￥符号的过滤器方法
        formatMoney(value) {
            return '￥' + value;
        }
    },
    methods: {
        backGo () {
            this.$router.go(-1);
        },
        // 改变商品数量
        changeMoney(pro,way) {
            if(way == 1) {
                pro.num++;
            }else {
                pro.num--;
                if(pro.num < 1) {
                    pro.num =1;
                }
            }
            this.calTotalPrice();
        },
        //单选按钮方法
        choose(pro) {
            this.checkAll = true;
            if( typeof pro.checked == 'undefined') {
                // 全局注册
                // Vue.set(pro,'checked',true)
                //局部注册
                this.$set(pro,'checked',true);
            }else {
                pro.checked = !pro.checked;
            }
            for(var i = 0;i < this.list.length; i++) {
                if(!this.list[i].checked) {
                    this.checkAll = false;
                }
            }
            this.calTotalPrice();
        },
        // 全选按钮
        cartchoose() {
            this.checkAll = !this.checkAll;
            var _this = this;
            this.list.forEach(function(item,index) {
                if(typeof item.checked == 'undefined') {
                    _this.$set(item,'checked',_this.checkAll);
                }else {
                    item.checked = _this.checkAll;
                }
            })
            _this.calTotalPrice();
        },
        // 总价格的计算、
        calTotalPrice: function() {
            var _this = this;
            _this.totalPrice = 0;
            this.list.forEach(function(item,index) {
                console.log(item)
                if(item.checked) {
                    _this.totalPrice += item.price * item.num; 
                }
            })
        },
        //结算弹窗
        doShowToast () {
            this.$vux.toast.show({
                text: 'toast'
            })
        }

   },
   created() {
       
   }
}
</script>

<style  lang='less' scoped>
@import '~vux/src/styles/close';
//弹窗样式
.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}

button.button {
    outline: none;
    background-color: gold;
    border: 0;
    width: 100px;
    margin-left: 25px;
    height: 100%;
    border-radius: 8px;
    line-height: 2em;
    font-size: larger;
    font-family: -webkit-pictograph;
}
ul.order_lists.cartTop {
    list-style: none;
}
input[type="checkbox"]{
    display: none;
}
label{
    position: relative;
    display: inline-block;
    z-index: 1;
    border: 1px solid #b8b8b8;
    margin-left: 10px;
    border-radius: 1px;
    width: 12px;
    height: 12px;
    cursor: pointer;
}



.cartMain{
    position: relative;
    width: 980px;
    min-width: 980px;
    margin: 0 auto;
    min-height: 210px;
}
/*购物车头部*/
.cartMain_hd{
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #3c3c3c;
}
.cartMain_hd .cartTop{
    height: 50px;
}
.cartMain_hd .cartTop .list_chk{
    width: 80px;
    text-indent: 30px;
}
.cartMain_hd .cartTop .list_con{
    width: 312px;
}
.cartMain_hd .cartTop .list_chk label{
    position: absolute;
    left: 10px;
    top:19px;
    margin: 0;
}
.cartMain_hd .cartTop .list_info{
    padding: 0;
    text-indent: 15px;
}
.cartMain_hd .cartTop .list_con{
    text-indent: 140px;
}


.cartBox{
    width: 100%;
    margin-bottom: 15px;
}
.cartBox .shop_info{
    position: relative;
    width: 100%;
    height: 38px;
    background-color: #fff;
    line-height: 38px;
    vertical-align: baseline;
}
.cartBox .shop_info .all_check{
    position: relative;
    float: left;
    width: 30px;
    height: 38px;
}

.cartBox .shop_info .all_check input[type="checkbox"]{
    position: absolute;
    z-index: 0;
    left: -20px;
    top: -20px;
}
.cartBox .shop_info .all_check .shop{
    position: absolute;
    top:13px;
}
.cartBox .shop_info .shop_name{
    float: left;
}



/*商品列表*/
.cartBox .order_content{
    border: 1px solid #ccc;
}
.cartBox .order_content a{
    display: block;
    text-decoration: none;
    color: coral;
}

.order_lists{
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    height: 80px;
    border-bottom: 1px solid #e7e7e7;
}
.order_lists:last-child{
    border-bottom: none;
}
.order_lists li{
    float: left;
    height: 100%;
}
label.check {
    background-color: #EE7A23;
    border: #EE7A23;
}
.order_lists .list_chk{
    position: relative;
    width: 50px;
}
.checked {
    background-color: #900;
}
.order_lists .list_chk input[type="checkbox"]{
    position: absolute;
    z-index: 0;
    left: -20px;
    top: -20px;
}
.order_lists .list_chk label{
    margin: 20px 0 0 24px;
}

.order_lists .list_con{
    width: 342px;
}
.order_lists .list_con .list_img{
    width: 80px;
    height: 80px;
    margin-top: 20px;
    float: left;
}
.order_lists .list_con .list_img img{
    width: 100%;
    vertical-align: top;
}
.order_lists .list_con .list_text{
    margin: 20px 0 0 90px;
    line-height: 18px;
    width: 200px;
    float: left;
}
.order_lists .list_con .list_text a{
    color: #3c3c3c;
    margin-bottom: 5px;
    text-decoration: none;
}
.order_lists .list_con .list_text{
    border-radius: 3px;
    color: #fff;
}
.order_lists .list_info{
    width: 252px;
    box-sizing: border-box;
}
.order_lists .list_info p{
    color: #9c9c9c;
    line-height: 18px;
    margin-left: 15px;
}
.order_lists .list_price{
    width: 180px;
}
.order_lists .list_price .price{
    margin-top: 20px;
    line-height: 18px;
    font-family: Verdana,Tahoma,arial;
    color: #3c3c3c;
    font-weight: bold;
}
.order_lists .list_price .charge{
    position: relative;
    z-index: 4
}
.order_lists .list_price .charge p{
    color: #ff0000;
    border:1px solid #ff0000;
    width: 64px;
    height:15px;
    line-height: 15px;
    padding:3px;
}
.order_lists .list_price .charge .chargebox{
    display: none;
    width: 300px;
    height: 110px;
    background: #000;
    z-index: 1;
}
.order_lists .list_amount{
    width: 120px;
}
.order_lists .list_amount .amount_box{
    margin-top: 20px;
    width: 77px;
    height: 25px;
    position: relative;
}
.order_lists .list_amount .amount_box input{
    width: 39px;
    height: 15px;
    line-height: 15px;
    border: none;
    color: #343434;
    text-align: center;
    padding: 4px 0;
    background-color: #fff;
    z-index: 2;
    position: absolute;
    left: 18px;
    float: left;
}
.order_lists .list_amount .amount_box a{
    float: left;
    height: 23px;
    width: 17px;
    border: 1px solid #e5e5e5;
    background: #f0f0f0;
    text-align: center;
    line-height: 23px;
    color: #444;
    position: absolute;
    top:0;
}
.order_lists .list_amount .amount_box a:hover{
    border-color: #ff873e;
    text-decoration: none;
    color: #ff873e;
    z-index: 3;
}

.order_lists .list_amount .amount_box .reduce{
    left: 0;
}

.order_lists .list_amount .amount_box .reSty{
    color: #cbcbcb;
}

.order_lists .list_amount .amount_box .plus{
    border-left-color: transparent;
    right: 0;
}


.order_lists .list_sum{
    width: 140px;
}
.order_lists .list_sum .sum_price{
    line-height: 18px;
    margin-top: 20px;
    font-family: Verdana,Tahoma,arial;
    color: #900;
    font-weight: bold;
}
.order_lists .list_op{
    width: 164px;
}
.order_lists .list_op .collect{
    margin-top: 20px;
}
.order_lists .list_op .del{
    line-height: 18px;
    margin:5px 0;
}
.order_lists .list_op{
    width: 200px;
    height: 350px;
    background-color: #000;
    display: none;
    position: relative;
    z-index: 9
}
/*底部总计算价*/
.bar-wrapper{
    width: 980px;
    height: 50px;
    position: fixed;
    bottom: -1px;
    z-index: 99;
    background: #e5e5e5;
}
.bar-wrapper .bar-right{
    float: right;
    color: #3c3c3c;
}
.bar-wrapper .bar-right strong{
    color: #900;
}

.bar-wrapper .bar-right .piece{
    float: left;
    min-width: 110px;
    margin-right: 20px;
    height: 50px;
    line-height: 50px;
}
.bar-wrapper .bar-right .piece .piece_num{
    display: inline-block;
    padding: 0 10px;
    font-weight: 700;
    font-size: 18px;
    font-family: tohoma,arial;
}
.bar-wrapper .bar-right .totalMoney{
    float: left;
    min-width: 100px;
    height: 50px;
    line-height: 50px;
}
.bar-wrapper .bar-right .totalMoney .total_text{
    float: right;
    font-weight: 400;
    font-size: 20px;
    font-family: Arial;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 15px;
}
.bar-wrapper .bar-right .calBtn{
    float: left;
}
.bar-wrapper .bar-right .calBtn a{
    display: block;
    width: 120px;
    height: 50px;
    color: #fff;
    background: #B0B0B0;
    cursor: not-allowed;
    font-size: 22px;
    letter-spacing: 5px;
    text-decoration: none;
    line-height: 50px;
    text-align: center;
    border-radius: 2px;
}
.bar-wrapper .bar-right .calBtn a.btn_sty{
    background: #ff873e;
    cursor: pointer;
}
</style>


