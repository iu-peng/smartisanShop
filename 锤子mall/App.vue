<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import headerNav from '@/components/header-nav'
import shopList from '@/views/shop-list/shop-list'


export default {
  components:{
    headerNav,
    shopList
  }
}
</script>

<style>

</style>
