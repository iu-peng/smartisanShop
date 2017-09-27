import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
	state:{
		goodsList:[],
		shopListItemData:[],
		itemData:{}
	},
	mutations:{
		editGoodsList(sta,data){
			sta.goodsList = data.car_list//返回的是购物车里的所有信息
		},
		editShopList(state,data){
			state.shopListItemData = data
		},
		getItemData(state,data){
			console.log(data.data)
			state.itemData = data.data
			console.log(this.state.itemData)
		}
	}
})

export default store
