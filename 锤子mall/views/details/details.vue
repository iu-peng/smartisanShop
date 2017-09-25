<template>
	<div id="main">
		<div class="store-content item">
			<div class="item-box">
				<div class="gallery-wrapper">
					<div class="gallery">
						<div class="thumbnail">
							<ul>
								<li class="on"><img src=""></li>
								<li><img src=""></li>
								<li><img src=""></li>
								<li><img src=""></li>
								<li><img src=""></li>
							</ul>
						</div>
						<div class="thumb">
							<ul>
								<li v-for="item in ItemImgData" class="on"><img :src="item.ali_image"></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="banner">
					<div class="sku-custom-title">
						<div class="params-price">
							<span><em>¥</em><i>{{itemData.price}}</i></span>
						</div>
						<div class="params-info">
							<h4>{{itemData.name}}</h4>
							<h6>{{titleNum.sub_title}}</h6>
						</div>
					</div>
					<div class="sku-dynamic-params-panel">
						<div class="sku-dynamic-params clear">
							<span class="params-name">颜色</span>
							<ul class="params-colors">
								<li 
									:class="{cur:n===index}" 
									@click="n=index"
									v-for="item,index in eachItemIconData"
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
	export default {
		data(){
			return {
				itemData:[],
				n:0
			}
		},
		mounted(){//这种商品的数据
			console.log(this.$route.params)
			return this.itemData = this.$store.state.itemData
		},
		computed:{
			eachItemIconData(){//小图片背景色
				let Arr = [];
				this.itemData.sku_info.forEach((item)=>{
					Arr.push('http://img01.smartisanos.cn/'+item.spec_json[0].image+'20X20.jpg')
				})
				return Arr
			},
			titleNum(){//小标题
				return this.itemData.sku_info[this.n]
			},
			ItemImgData(){
				return this.itemData.sku_info
			}
		}
	}
</script>