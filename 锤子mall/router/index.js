import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import homePage from '@/views/home'

import shopList from '@/views/shop-list/shop-list'
import details from '@/views/details/details'

let router = new Router({
	mode:'history',
	routes:[
		{
			path:'/',
			component:homePage,
			name:'homepage',
			children:[
				{
					path:'',
					component:shopList,
					name:'shoplist'
				},
				{
					path:'/details/:id',
					component:details,
					name:'details'
				}
			]
		}
	]
})

export default router
