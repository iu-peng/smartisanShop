<template>
	<div id="main" class="hander-car">
		<div class="store-content">
			<div class="cart-box">
				<div class="title">
					<h2>购物清单</h2>
				</div>
				<div class="cart-inner">
					<div class="empty-label hide">
						<h3>您的购物车中还没有商品</h3>
						<a class="link" href="javascript:;">现在选购</a>
					</div>
					<div>
						<div class="cart-table-title">
							<span class="name">商品信息</span>
							<span class="operation">操作</span>
							<span class="subtotal">小计</span>
							<span class="num">数量</span>
							<span class="price">单价</span>
						</div>
						<div class="cart-table">
							<div class="cart-group">
								<!--购物列表-->
								<div class="cart-top-items" v-for="item in shopedList">
									<div class="cart-items">
										<div class="items-choose">
											<span class="blue-checkbox-new checkbox-on"><a></a></span>
										</div>
										<div class="items-thumb">
											<img :src="item.ali_image+'?x-oss-process=image/resize,w_160/quality,Q_100/format,webp'">
											<a href="javascript:;" target="_blank"></a>
										</div>
										<div class="name hide-row" >
											<div class="name-table">
												<a 
												href="javascript:;" 
												target="_blank">{{item.title}}</a>
												<ul class="attribute">
													<li>{{item.spec_json[0].item_value}}</li>
												</ul>
											</div>
										</div>
										<div class="operation">
											<a 
												class="items-delete-btn" 
												@click="delGoods(item.sku_id)"
											></a>
										</div>
										<div class="subtotal">¥ {{item.price*item.sku_num}}.00</div>
										<div class="item-cols-num">
											<div class="select js-select-quantity">
												<span 
													:class="[{'down-disabled':item.sku_num===1},'down']"
													@click="reduceOneToCar(item)"
												>-</span>
												<span class="num">
													<input type="text" style="display: inline-block;" :value="item.sku_num">
													<ul><
														<li>1</li>
														<li>2</li>
													</ul>
												</span>
												<span 
													:class="[{'up-disabled':item.sku_num===5},'up']"
													@click="addOneToCar(item)"
												>+</span>
												
											</div>
										</div>
										<div class="price">¥ {{item.price}}.00</div>
									</div>
								</div>
								<!-- <div class="cart-top-items">
									<div class="cart-items">
										<div class="items-choose">
											<span class="blue-checkbox-new checkbox-on"><a></a></span>
										</div>
										<div class="items-thumb">
											<img src="">
											<a href="javascript:;" target="_blank"></a>
										</div>
										<div class="name hide-row" >
											<div class="name-table">
												<a href="javascript:;" target="_blank">坚果 Pro 钢化玻璃手感膜 无孔 （后壳用）</a>
												<ul class="attribute">
													<li>透明</li>
												</ul>
											</div>
										</div>
										<div class="operation">
											<a class="items-delete-btn" ></a>
										</div>
										<div class="subtotal">¥ 49.00</div>
										<div class="item-cols-num">
											<div class="select js-select-quantity">
												<span class="down down-disabled">-</span>
												<span class="num">
													<input type="text" style="display: inline-block;">
													<ul><
														<li>1</li>
														<li>2</li>
													</ul>
												</span>
												<span class="up">+</span>
												
											</div>
										</div>
										<div class="price">¥ 49.00</div>
									</div>
								</div> -->
							</div>
						</div>
					</div>
				</div>
				<div class="cart-bottom-bg fix-bottom">
					<div class="cart-bar-operation">
						<div>
							<div class="choose-all js-choose-all">
								<span class="blue-checkbox-new checkbox-on"><a></a></span>
								全选
							</div>
							<div class="delete-choose-goods">删除选中的商品</div>
						</div>
					</div>
					<div class="shipping">
						<div class="shipping-box">
							<div class="shipping-total shipping-num">
								<h4 class="">
									已选择 <i>0</i> 件商品
								</h4>
								<h5>
									共计 <i >{{shopedNum}}</i> 件商品
								</h5>
							</div>
							<div class="shipping-total shipping-price">
								<h4 class="">
									应付总额：<span>￥</span><i >0</i> 
								</h4>
								<h5 class="shipping-tips">
									应付总额不含运费
								</h5>
								
							</div>
						</div>
						<span class="jianguo-blue-main-btn big-main-btn js-checkout disabled-btn"><a>现在结算</a></span>
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
			return{
				//shopedList:[],//返回的是购物车中的所有数据
				//shopedNum:0
			}
		},
		computed:{
			shopedList(){
				return this.$store.state.goodsList
			},
			goodChecked(){

			},
			shopedNum(){
				let n = 0;
				//console.log(this.shopedList)
				this.shopedList.forEach((item)=>{
					n += item.sku_num 
				})
				return n
			}
		},
		/*mounted(){//购物车组件负责一加载就获取，而不是放在list列表加载获取
		    Axios.get('http://localhost:3100/api/getShopCarList')
		    .then((data)=>{
		        this.$store.commit('editGoodsList',data.data)
		    })
		},*/
		methods:{
			delGoods(goodId){
			    Axios.post(
			        'http://localhost:3100/api/removeCarShopById',
			        {removeId:goodId}//JSON.stringify(goodId) 此处不用json请求
			    )
			    .then((data)=>{
			        //console.log(data.data)
			        this.$store.commit('editGoodsList',data.data)
			    })
			},
			addOneToCar(item){//传过去的是该商品的所有信息
				if(item.sku_num===5){
					return
				}
				console.log(item)

				Axios.post(
					'http://localhost:3100/api/addOne',
					{carList:JSON.stringify(item)}//发送的数据是该商品的所有信息
				)
				.then((data)=>{
					this.$store.commit('editGoodsList',data.data)
				})
			},
			reduceOneToCar(item){//传过去的是该商品的所有信息
				if(item.sku_num===1){//最少为1个
					return
				}
				console.log(item)

				Axios.post(
					'http://localhost:3100/api/reduceOne',
					{carList:JSON.stringify(item)}//发送的数据是该商品的所有信息
				)
				.then((data)=>{
					this.$store.commit('editGoodsList',data.data)
				})
			}
		}
		/*mounted(){
			Axios.get('http://localhost:3100/api/getShopCarList')
			.then((data)=>{
			    return this.shopedList = data.data.car_list
			})
			.then((data)=>{//得到的是上面return出来的数组
				data.forEach((item)=>{
					this.shopedNum += item.sku_num 
				})
			})
		},*/
	}
</script>