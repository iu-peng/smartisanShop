import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import homePage from '@/views/home'

import shopList from '@/views/shop-list/shop-list'
import details from '@/views/details/details'
//导航
//import headerNav from '@/components/header-nav'
//大导航
import headerTnav from '@/components/header-tnav'
//小导航
import headerBnav from '@/components/header-bnav'
//购物车
import carList from '@/views/carList/car-list'

let router = new Router({
	mode:'history',
	routes:[
		{
			path:'/',
			component:homePage,
			children:[
				{
					path:'/',//列表页
					components:{tnav:headerTnav,bnav:headerBnav,default:shopList},
					name:'shoplist'
				},
				{
					path:'/details/:id',//详情页
					components:{tnav:headerTnav,bnav:headerBnav,default:details},
					name:'details'
				},
				{
					path:'/cart',//购物车页面
					components:{tnav:headerTnav,default:carList},
					name:'carlist'
				}
			]
		}
	]
})

export default router
