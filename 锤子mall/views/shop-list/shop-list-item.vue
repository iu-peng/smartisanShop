<template>
  <div>
    <div class="item">
    	<div>
    		<div class="item-img">
    			<img 
    				:alt="eachDataStitle.title" 
    				:src="eachDataStitle.ali_image" 
    				style="opacity: 1;"
    				/>
    		</div>
    		<h6>{{eachData.name}}</h6>
    		<h3 >{{eachDataStitle.sub_title}}</h3>
    		<div class="params-colors">
    			<ul class="colors-list">
    				<li v-for="item,i in eachDataSicon" @mouseenter="index=i">
    					<a href="javascript:;" :class="{active:i===index}">
    						<img :src="item">
    					</a>
    				</li>
    			</ul>
    		</div>
    		<div class="item-btns clearfix">
    			<span class="item-gray-btn">
    				<a href="javascript:;" @click="jump">查看详情</a> 
    			</span>
    			<span 
    				v-show="eachDataStitle.direct_to_cart" 
    				class="item-blue-btn"
    				@click="addCar"
    			>
    				加入购物车 
    			</span>
    		</div>
    		<div class="item-price clearfix">
    			<i>¥</i><span>{{eachData.price}}.00</span>
    		</div>
    		<div class="discount-icon">false</div>
    		<div class="item-cover">
    			<a href="javascript:;" target="_blank"></a>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>

import Axios from 'axios'

export default {
	props:['eachData'],
	data(){
		return {
            index:0
		}
	},
	computed:{
		eachDataStitle(){
			return this.eachData.sku_info[this.index]//小标题
		},
		eachDataSicon(){
			let iconArr = [];
			this.eachData.sku_info.forEach((item)=>{
				iconArr.push('http://img01.smartisanos.cn/'+item.spec_json[0].image+'20X20.jpg')
			})
			return iconArr
		}
	},
	methods:{
		addCar(){
			Axios.post(
				'http://localhost:3100/api/setShopCarList',
				{carList:JSON.stringify(this.eachDataStitle)}//发送的数据是该商品的所有信息
			)
			.then((data)=>{
				this.$store.commit('editGoodsList',data.data)
			})
		},
        jump(){
            this.$router.push( {name:'details',params:{id:this.eachData.id}} )
            this.$store.commit('getItemData',this.eachData)
        }
	}
}

</script>

<style>

</style>