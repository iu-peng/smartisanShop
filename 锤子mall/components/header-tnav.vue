<template>
  <div>
      <div class="nav-global">
        <div class="container">
          <h1 class="nav-logo">
            <!-- <a href="javascript:;"></a> -->
            <router-link :to="{path:'/'}"></router-link>
          </h1>
          <ul class="nav-aside">
            <li class="nav-user">
              <a href="javascript:;">个人中心</a>
              <!--active-->
              <div class="nav-user-wrapper">
                <div class="nav-user-list">
                  <dl class="nav-user-avatar">
                    <dd><span class="ng-scope"></span></dd>
                    <dt class="ng-binding">+86 138****9453</dt>
                  </dl>
                  <ul>
                    <li class="order"><a href="javascript:;">我的订单</a></li>
                    <li class="support"><a href="javascript:;">售后服务</a></li>
                    <li class="coupon"><a href="javascript:;">我的优惠</a></li>
                    <li class="information"><a href="javascript:;">账户资料</a></li>
                    <li class="address"><a href="javascript:;">收货地址</a></li>
                    <li class="logout"><a href="javascript:;">退出</a></li>
                  </ul>
                </div>
              </div>
            </li>
            <!--active-->
            <li 
              :class="[{active:enterStatus},'nav-cart']"
              @mouseover="changeEnterStatus"
              @mouseout="changeOutStatus"
              @click="jumpToCar"
            >
                <transition name="fade">
                    <shop-car @mouseover="changeEnterStatus" @mouseout="changeOutStatus"></shop-car>
                </transition>
              
            </li>
          </ul>
          <ul class="nav-list">
            <li><a href="javascript:;">在线商城</a></li>
            <li><a href="javascript:;">坚果 Pro</a></li>
            <li><a href="javascript:;">Smartisan M1 / M1L</a></li>
            <li><a href="javascript:;">Smartisan OS</a></li>
            <li><a href="javascript:;">欢喜云</a></li>
            <li><a href="javascript:;">应用下载</a></li>
            <li><a href="javascript:;">官方论坛</a></li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
import shopCar from '@/components/shop-car'

export default {
    data(){
        return {
            enterStatus:false,
            timer:null
        }
    },
    components:{
        shopCar
    },
    methods:{
        changeEnterStatus(){//鼠标移入
          console.log(333)
            if(this.timer){
                clearTimeout(this.timer)
            }
            return this.enterStatus = true
        },
        changeOutStatus(){//鼠标移出
            this.timer = setTimeout(()=>{
                return this.enterStatus = false
            },200)
        },
        jumpToCar(){
          this.$router.push({name:'carlist'})
        }
    }
}
</script>

<style>
   
</style>
