<template>
	<div>
		
		<router-view name="tnav"></router-view>
		<router-view name="bnav"></router-view>
		<router-view></router-view>
		<!-- 主体部分 -->
	</div>
</template>

<script>
	//import headerNav from '@/components/header-nav'

	export default {
		components:{
			//headerNav
		}
	}
</script>