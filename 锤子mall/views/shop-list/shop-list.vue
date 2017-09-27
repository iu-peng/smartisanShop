<template>
  <div>
    <router-view></router-view>
    <div id="main">
    	<div class="sku-box store-content">
    		<div class="sort-option">
    			<ul class="line clear">
    				<li><a href="javascript:;" class="active">综合排序</a></li>
    				<li><a href="javascript:;" class="">销量排序</a></li>
    				<li><a href="javascript:;" class="">价格低到高</a></li>
    				<li><a href="javascript:;" class="">价格高到低</a></li>
    			</ul>
    		</div>
    		<div class="gray-box">
    			<div class="item-box">
                    <shop-list-item 
                    v-for="item,index in shopListItemData"
                    key="index"
                    :each-data="item"
                    ></shop-list-item>
    			</div>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
import shopListItem from '@/views/shop-list/shop-list-item'
import headerNav from '@/components/header-nav'
import Axios from 'axios'

export default {
    data(){
        return {
            shopListItemData:[]
        }
    },
    components:{
        shopListItem
    },
    mounted(){
        //上来就请求列表数据
        Axios.get('http://localhost:3100/api/list')
        .then((data)=>{
            this.shopListItemData = data.data.list
            this.$store.commit('editShopList',data.data.list)
        })
        .catch((data)=>{
        })

        //请求购物车数据----购物车组件负责刚开启页面获取
        /*Axios.get('http://localhost:3100/api/getShopCarList')
        .then((data)=>{
            this.$store.commit('editGoodsList',data.data)
        })*/
    }

}

</script>

<style>

</style>