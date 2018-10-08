<template>
  <div class="f-dataList" @click="turnTo">
    <div class="list-top">
      <div class="left">
        <img :src="data.logo||'~@/assets/images/logo_p.png'" alt="">
      </div>
      <div class="right">
        <div class="right-t">
          <div class="name">{{data.name}}</div>
          <div :class="isBig?'isBig':'ping'">{{isBig?data.rank:formatLevel(data.level)+'级' | deleteLabel}}</div>
          <div class="xi">{{data.type}}</div>
        </div>
        <div class="right-b">{{data.resume}}</div>
      </div>
    </div>
    <div class="list-bottom">
      <div class="left" :class="isBig?'bigl':''">
        <p :class="isBig?'':'orange'"><span>{{data.firstBate | deleteLabel}}</span>{{data.firstUnit | deleteLabel}}</p>
        <p>{{data.firstBateTag ||'最低起投金额' | deleteLabel}}</p>
      </div>
      <div class="center" :class="isBig?'bigc':''">
        <p :class="isBig?'orange':''"><span>{{data.avgHistory ||'0.00' | deleteLabel}}</span>{{data.avgUnit | deleteLabel}}</p>
        <p>{{data.avgHistoryTag ||'历史平均年化' | deleteLabel}}</p>
      </div>
      <div class="right" :class="isBig?'bigr':''">
        <p><span>{{data.sumActivity  ||'0.00' | deleteLabel}}</span>{{data.sumUnit | deleteLabel}}</p>
        <p>{{data.sumActivityTag ||'活动综合年化' | deleteLabel}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['listContent', 'isBig'],
  data() {
    return {
      data: {}
    }
  },
  filters: {
    deleteLabel(res) {
      return res.replace(/<[\/\!]*[^<>]*>/ig, "");
    }
  },
  methods: {
    formatLevel(level) {
      switch (level) {
        case 1:
          return 'AAAA';
        case 2:
          return 'AAA';
        case 3:
          return 'AA';
        case 4:
          return 'A';
        case 5:
          return 'B';
        case 6:
          return 'C';
        case 7:
          return 'D';
      }
    },
    turnTo() {
      if (!this.isPC()) {
        var protocol = window.location.protocol
        var host = window.location.host
        // var hash  = window.location.hash;
        var root = protocol + '//' + host + '/'
        let url = root + 'wap/other/teach'
        
          //内链
      this.ToAppPage(url, this.data)


      } else {
        
        this.$router.push({name: 'teachDetail', query: this.data})
      }
    }
  },
  created() {
    this.data = this.listContent || {};
  }
}

</script>
<style lang="less" scope>
.f-dataList {
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #E6E6E6;
}

.f-dataList>a {
  text-decoration: none;
  cursor: default;
}

.list-top {
  margin-top: 14px;
  margin-bottom: 8px;
  display: flex;
  .left {
    width: 55px;
    height: 55px;
    vertical-align: middle;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .right {
    flex: 1;
    margin-left: 10px;
    .right-t {
      display: flex;
      align-items: center;
      .name {
        color: #1C2042;
        font-size: 18px;
      }
      .ping {
        margin: 5px;
        height: 15px;
        min-width: 30px;
        background: #FFF3EB;
        color:#FF6C04;
        border:1px solid #FF6C04;
        border-radius: 1em;
        background-size: 100% 100%;
        font-size: 10px;
        text-align: center;
        padding: 0px 10px;
        margin-left: 5px;
        margin-right: 5px;
      }
      .isBig {
        height: 15px;
        color: #ff6c04;
        background: #FFF3EB;
        border: 1px solid #ff6c04;
        font-size: 10px;
        text-align: center;
        padding: 0px 5px;
        border-radius: 15px;
        line-height: 15px;
        margin-left: 15px;
        margin-right: 10px;
      }
      .xi {
        height: 15px;
        color: #597FFE;
        border: 1px solid #597FFE;
        background-color: #EDF1FF;
        font-size: 10px;
        text-align: center;
        padding: 0px 5px;
        border-radius: 15px;
        line-height: 15px;
      }
    }
    .right-b {
      margin-top: 5px;
      font-size: 10px;
      text-align: left;
      color: #A4A4A4;
    }
  }
}

.list-bottom {
  display: flex;
  margin-bottom: 20px;
  padding-top: 15px;
  border-top: 1px solid #E6E6E6;
  border-top-style: dashed;
  .left {
    width: 100px;
    padding-right: 10px;
    border-right: 1px solid #ECECEC;
    p:first-child {
      color: #1c2042;
      font-size: 14px;
      color: #1c2042;
      span {
        letter-spacing: -1px;
        font-size: 26px;
        color: #1c2042;
        & * {
          letter-spacing: -1px!important;
          font-size: 26px!important;
          color: #1c2042;
        }
      }
    }
    .orange {
      color: #FF6C04!important;
      span {
        color: #FF6C04!important;
        & * {
          color: #FF6C04!important;
        }
      }
    }
    p:last-child {
      line-height: 1.5!important;
      font-size: 12px!important;
      color: #A4A4A4!important;
      & * {
        line-height: 1.5!important;
        font-size: 12px!important;
        color: #A4A4A4!important;
      }
    }
  }
  .center {
    min-width: 80px;
    padding-right: 35px;
    padding-left: 15px;
    position: relative;
    flex: 1;
    &:after {
      content: '+';
      display: block;
      width: 30px;
      height: 23px;
      font-size: 20px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    color:#a4a4a4;
      background-size: contain;
    }
    p:first-child {
      font-size: 14px;
      color: #1C2042;
      span,
      span * {
        letter-spacing: -1px!important;
        font-size: 26px!important;
        color: #1C2042;
      }
    }
    p:last-child {
      font-size: 12px!important;
      color: #A4A4A4 !important;
    }
    .orange {
      color: #FF6C04!important;
      span {
        color: #FF6C04!important;
        & * {
          color: #FF6C04!important;
        }
      }
    }
  }
  .right {
    width: 100px;
    p:first-child {
      font-size: 14px;
      color: #1C2042!important;
      span,
      span * {
        letter-spacing: -1px!important;
        font-size: 26px!important;
        color: #1C2042!important;
      }
    }
    p:last-child,
    p * {
      font-size: 12px!important;
      color: #A4A4A4 !important;
    }
  }
  .right {
    padding-left: 15px;
  }
  .bigl {
    padding: 0;
    border: none;
  }
  .bigc {
    flex: 1;
    padding: 0;
    padding-left: 30px;
    &:after {
      content: '';
      background: transparent;
    }
  }
  .bigr {}
}

</style>
