<template>
<div>
    <a href="javascript:;">购物车</a>
    <!--根据class改变颜色-->
    <span  :class="[{'cart-num':goodsList.length},'cart-empty-num']">
        <i>{{goodsNumSum}}</i>
    </span>
    <div class="nav-cart-wrapper">
        <div class="nav-cart-list">
            <div class="empty" v-show="!goodsList.length">
                <h3>购物车为空</h3>
                <p>您还没有选购任何商品，现在前往商城选购吧!</p>
            </div>
            <div class="full" v-show="goodsList.length">
                <div class="nav-cart-items">
                    <ul>
                        <li class="clear" v-for="item in goodsList">
                            <div class="cart-item js-cart-item cart-item-sell">
                                <div class="cart-item-inner">
                                    <div class="item-thumb">
                                        <img :src="item.ali_image">
                                    </div>
                                    <div class="item-desc">
                                        <div class="cart-cell">
                                            <h4>
                                                <a href="#/item/100027401">{{item.title}}</a>
                                            </h4>
                                            <p class="attrs">
                                                <span>{{item.spec_json[0].show_name}}</span>
                                            </p>
                                            <h6>
                                                <span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x{{item.sku_num}}</span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="del-btn" good-id="item.sku_id" @click.stop="delGoods(item.sku_id)">删除</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="nav-cart-total">
                    <p>共 <strong class="ng-binding">{{goodsNumSum}}</strong> 件商品</p>
                    <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{goodsPriceSum}}</span></h5>
                    <h6>
                        <a 
                        class="nav-cart-btn" 
                        href="javascript:;"
                        @click="jumpToCar"
                        >去购物车</a>
                    </h6>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Axios from 'axios'

export default {
    data(){
        return {
            
        }
    },
    mounted(){//购物车组件负责一加载就获取，而不是放在list列表加载获取
        Axios.get('http://localhost:3100/api/getShopCarList')
        .then((data)=>{
            this.$store.commit('editGoodsList',data.data)
        })
    },
    computed:{
        goodsList(){//商品列表
            return this.$store.state.goodsList
        },
        goodsNumSum(){//总共的商品数量
            let goodsNum = 0
            this.goodsList.forEach((item)=>{
                goodsNum += item.sku_num
            })
            return goodsNum
        },
        goodsPriceSum(){
            let goodsPrice = 0
            this.goodsList.forEach((item)=>{
                goodsPrice += item.price * item.sku_num
            })
            return goodsPrice
        }
    },
    methods:{
        delGoods(goodId){
            console.log(goodId)
            Axios.post(
                'http://localhost:3100/api/removeCarShopById',
                {removeId:goodId}//JSON.stringify(goodId) 此处不用json请求
            )
            .then((data)=>{
                //console.log(data.data)
                this.$store.commit('editGoodsList',data.data)
            })
        },
        jumpToCar(){
          this.$router.push({name:'carlist'})
        }
    }
}

</script>

<style>

</style>