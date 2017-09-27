<template>
	<div id="main">
		<div class="store-content item">
			<div class="item-box">
				<div class="gallery-wrapper">
					<div class="gallery">
						<div class="thumbnail">
							<ul>
								<li 
								v-for="item,i in imgData" 
								:class="{on:i===index}"
								@click="index=i,changeBigImg"
								>
									<img :src="item">
								</li>
							</ul>
						</div>
						<div class="thumb">
							<ul>
								<li class="on"><img :src="bigImg"></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="banner">
					<div class="sku-custom-title">
						<div class="params-price">
							<span><em>¥</em><i>{{inItemData.price}}</i></span>
						</div>
						<div class="params-info">
							<h4>{{itemData.title}}</h4>
							<h6>{{itemData.sub_title}}</h6>
						</div>
					</div>
					<div class="sku-dynamic-params-panel">
						<div class="sku-dynamic-params clear">
							<span class="params-name">颜色</span>
							<ul class="params-colors">
								<li 
									:class="{cur:i===curIndex}" 
									@click="curIndex=i"
									v-for="item,i in curColorImg"
								>
									<a><i><img :src="item"></i></a>
								</li>
							</ul>
						</div>
						<div class="sku-dynamic-params clear">
							<div class="params-name">数量</div>
							<div class="params-detail clear">
								<div class="item-num js-select-quantity">
									<span class="down down-disabled">-</span>
									<span class="num">1</span>
									<span class="up up-disabled">+</span>
								</div>
							</div>
						</div>
					</div>
					<div class="sku-status">
						<div class="cart-operation-wrapper clearfix">
							<span class="blue-title-btn js-add-cart"><a>加入购物车</a></span>
							<span class="gray-title-btn"><a>现在购买</a></span>
						</div>
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
				inItemData:{},//一级数据含价格的
				itemData:{},//二级商品描述
				imgData:[],//图片地址数组
				curColorImg:[],//表示颜色材质的图片地址数组
				bigImg:'',//大图地址 默认一进入是第一张，点击左侧的图片后调用函数更改大图地址
				index:0,
				curIndex:0
			}
		},
		mounted(){//这种商品的数据
			let n = this.$route.params.id
			Axios.post('http://localhost:3100/api/getItem',
			    {itemId:n}
			)
			.then((data)=>{//一级数据含价格的
				return this.inItemData = data.data.data
			})
			.then((data)=>{//二级商品描述
		     	return this.itemData = data.shop_info
			})
			.then((data)=>{//左侧小图片地址
				let imgUrl = data.ali_images
				let arr = []
				imgUrl.forEach((item)=>{
					arr.push( item + '?x-oss-process=image/resize,w_108/quality,Q_90/format,webp' )
				})
				this.imgData = arr

				let n = arr[0].indexOf('?') //匹配?出现的位置
				this.bigImg = arr[0].slice(0,n+1)+'x-oss-process=image/resize,w_880/quality,Q_90/format,webp'


				return data.spec_v2 //把材质颜色数组反馈出去
			})
			.then((data)=>{
				let imgUrlPre = data[0].image_pre//材质颜色图片地址的前缀
				let imgUrlBack = data[0].spec_values//材质颜色图片地址后面的地址数组

				let arr = []
				imgUrlBack.forEach((item)=>{
					arr.push( imgUrlPre + item.image + '20X20@2x.jpg' )
				})
				this.curColorImg = arr
			})	
		},
		computed:{
			changeBigImg(){
				//let re = /\?.*$/g
				//console.log( this.imgData[this.index].match(re) )
				//let reImgCut = this.imgData[this.index].match(re)[0] //用正则匹配地址后的多余字符
				let n = this.imgData[this.index].indexOf('?') //匹配?出现的位置
				return this.bigImg = this.imgData[this.index].slice(0,n+1)+'x-oss-process=image/resize,w_880/quality,Q_90/format,webp'
				console.log(this.bigImg)
			}
		}
	}
	// http://image.smartisanos.cn/resource/902befd5f32a8caf4ca79b55d39ee25a.jpg?x-oss-process=image/resize,w_108/quality,Q_90/format,webp
	// http://image.smartisanos.cn/resource/902befd5f32a8caf4ca79b55d39ee25a.jpg?x-oss-process=image/resize,w_108/quality,Q_90/format,webp
</script>
