<template>
<div class="discount-coupon-bg">
  
  <slider-nav class="slider-nav-bg" :titleArray="titleArray" :currentTab.sync="currentTab"></slider-nav>
    
  <mt-tab-container v-model="currentTab" class="bg">
       
    <mt-tab-container-item id="0" class="item-bg" v-if="is_use">
      
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded_use" ref="loadmore" bottomPullText="上拉加载更多" bottomDropText="释放加载" :bottomDistance="bottomDis" >
         <discount-coupon-cell :isUseful="true" v-for="item in ticketList_use" :key="item.id" @refresh="refresh" :ticketItem="item"></discount-coupon-cell>
      
      <empty v-if="noData_use"></empty>
     
      <div class="botom-text-bg" @click="knowRuleOnClick">
        <div class="botom-text">点我了解现金券</div>
      </div>

      </mt-loadmore>
    </mt-tab-container-item>

     <mt-tab-container-item id="1" class="item-bg" v-if="!is_use">
       <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded_unuse" ref="loadmore" bottomPullText="上拉加载更多" bottomDropText="释放加载" :bottomDistance="bottomDis">   
        <discount-coupon-cell :isUseful="false" v-for="item in ticketList_unuse" :key="item.id" @refresh="refresh" :ticketItem="item"></discount-coupon-cell>
        <empty v-if="noData_unuse"></empty>
        <div class="botom-text-bg" @click="knowRuleOnClick">
          <div class="botom-text">点我了解现金券</div>
        </div>

      </mt-loadmore>
     
    </mt-tab-container-item>

  </mt-tab-container>
  <!-- 导航条 -->
  <div class="title-container">
    <img class="img" src='/static/images/BACK.png' @click="goback" />
    <span class="title-sytle">财喵宝箱</span>
    <div class="line"></div>
  </div>

</div>

</template>

<script>

import DiscountCouponCell from '@/components/Coupon/DiscountCouponCell'
import SliderNav from '@/components/Coupon/SliderNav'
import {ruleUrl} from '@/utils/env';
import http from "@/utils/http";
import Empty from "@/components/Empty";

export default {
    
    data () {
      return {
        ticketList_use: [],
        curentPage_use:0,
        allLoaded_use: false,
        noData_use: false,
        noNet_use: false,
        
        ticketList_unuse: [],
        curentPage_unuse:0,
        allLoaded_unuse: false,
        noData_unuse: false,    
        noNet_unuse: false,

        bottomDis: 50,

        currentTab: '0',
        titleArray: ['可使用', '已失效'],
        
        
      }
    },
    props: {

    },
    computed: {
      is_use () {
        return this.currentTab == '0' ? true : false;
      },
    },
    methods: {
      /// 返回
      goback() {
        this.$router.go(-1)
      },
      /// 刷新数据
      refresh () {
        this.getTicketListForUse(true)
        this.getTicketListForUNUse(true)
      },
      /// 下拉刷新
      loadTop () {
        if (this.is_use) {
          this.getTicketListForUse(true)
        } else {
          this.getTicketListForUNUse(true)
        }
        
      },
      /// 加载更多
      loadBottom () {
        if (this.is_use) {
          this.getTicketListForUse(false)
        } else {
          this.getTicketListForUNUse(false)
        }
       
      },
      // 了解现金券
      knowRuleOnClick () {
        top.window.open(ruleUrl);
      },
      /// 加载有效优惠券
      getTicketListForUse (isHeader) {
        
        var page = 1
        var currentPage = this.curentPage_use;
        if (isHeader) {
          page = 1
        } else {
          if (currentPage == 0) {
            page = 2;
          } else {
            page = currentPage + 1;
          }
        }
        var params = {
          page: page,
          type: 1,
          // limit: 1
        }
        
        http.post('/web/cashcoupon/list', params).then((data) => {
          
          this.curentPage_use = page;
          if (isHeader) {
            this.$refs.loadmore.onTopLoaded();
          } else {
            this.$refs.loadmore.onBottomLoaded();
          }
          this.noNet_use = false
          if (isHeader) {
            this.ticketList_use = data.list
          } else {
            this.ticketList_use = this.ticketList_use.concat(data.list)
            if (this.ticketList_use.length == data.count) {
              this.allLoaded_use = true
            }
          }
          this.noData_use = this.ticketList_use.length == 0 ? true : false;

        })
          // .catch((err) => {
          //   this.failureMethod(err, isHeader)
          //   this.noNet_use = true
          // })
      },
      /// 加载无效优惠券
      getTicketListForUNUse (isHeader) {

        var page = 1
        var currentPage = this.curentPage_unuse;
        if (isHeader) {
          page = 1
        } else {
          if (currentPage == 0) {
            page = 2;
          } else {
            page = currentPage + 1;
          }
        }
        var params = {
          page: page,
          type: 2,
          // limit: 2
        }
        http.post('/web/cashcoupon/list', params).then((data) => {
          this.curentPage_unuse = page;
          if (isHeader) {
            this.$refs.loadmore.onTopLoaded();
          } else {
            this.$refs.loadmore.onBottomLoaded();
          }
          this.noNet_unuse = false
          if (isHeader) {
            this.ticketList_unuse = data.list
          } else {
            this.ticketList_unuse = this.ticketList_unuse.concat(data.list)
            if (this.ticketList_unuse.length == data.count) {
              this.allLoaded_unuse = true
            }
          }
          this.noData_unuse = this.ticketList_unuse.length == 0 ? true : false;
        })
          // .catch((err) => {
          //   this.failureMethod(err, isHeader)
          //   this.noNet_unuse = true
          // })
      },
      /**
       * 请求失败回调
       */
      failureMethod (err, isHeader, is_use) {
        if (isHeader) {
          this.$refs.loadmore.onTopLoaded();
        } else {
          if (is_use) {
            this.allLoaded_use = false
          } else {
            this.allLoaded_unuse = false
          }
        }
        this.$toast({
          message: '当前网络阻塞，请稍后再试。',
          duration: 3000
        })
      },

    },
    created () {
        this.getTicketListForUse(true)
        this.getTicketListForUNUse(true)
    },
    components: {
      SliderNav,
      DiscountCouponCell,
      Empty
    }
}
</script>


<style lang="postcss" scoped>

.discount-coupon-bg {
   width: 375px;
   height: 100%;
   background-color: white;
}
.slider-nav-bg {
  margin-top: 44px;
}
.bg {
  top: 114px;
  position: absolute;
}

.title-container {
    width: 100%;
    height: 44px;
    background: white;
    position: fixed;
    z-index: 1100;
}

.img {
    margin-top: 10px;
    height: 27px;
    width: 24px;
    margin-left: 14px;
    position: absolute;
  }
.title-sytle {
    margin-top: 10px;
    margin-left: 150px;
    font-size: 18px;
    color: #253B40;
    position: absolute;
}
.line {
  background-color: #e6e6e6;
  margin-top: 43px;
  width: 100%;
  height: 0.5px;
  color: #e6e6e6;
  position: absolute;
}
.botom-text-bg {
  background-color: white;
  width: 375px;
  height: 40px;
  margin-top: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.botom-text {
  display: table-cell;
  vertical-align: middle;
  color: #4477DD;
  font-size: 12px;
  width: auto;
  border-bottom: 1px solid #4477DD;
  height: 22px;
}


</style>
