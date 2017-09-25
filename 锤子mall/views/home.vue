<template>
	<div>
		<header-nav></header-nav>
		<!-- 头部信息 -->
		<router-view></router-view>
		<!-- 主体部分 -->
	</div>
</template>

<script>
	import headerNav from '@/components/header-nav'

	export default {
		components:{
			headerNav
		}
	}
</script>