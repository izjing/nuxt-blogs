<template>
  <div id="default">
    <div class="header">
      <div class="header_w">
        <h1>
          izjing
        </h1>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="">
            首页
          </el-menu-item>
          <el-menu-item index="home">
            留言
          </el-menu-item>
          <el-menu-item index="4">
            记录
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="content">
      <div class="content_user">
        <user-card />
        <div class="content_img mrt15 shadow">
          <h3>公众号</h3>
          <el-image
            style="width: 280px; height: 280px"
            src="https://p.ananas.chaoxing.com/star3/origin/20fdd2116f0cc8c7f9f7360f71bd1ab1.jpg"
            :preview-src-list="srcList"
          />
        </div>
        <div class="content_img mrt15 shadow">
          <echarts />
        </div>
      </div>
      <div class="content_route">
        <nuxt />
      </div>
      <div class="content_right shadow">
        <div>1111</div>
      </div>
    </div>
    <div class="footer">
      <transition name="el-fade-in-linear">
        <el-button
          v-show="footerButton"
          class="footer_button"
          type="info"
          icon="el-icon-caret-top"
          circle
          @click="clickScroll"
        />
      </transition>
      <p>版权所有：<a href="http://izjing.com/">izjing</a>||<a href="http://beian.miit.gov.cn">备案号：京ICP备19057757号-1</a></p>
    </div>
  </div>
</template>
<script>
import { throttle } from '../assets/utils'
import userCard from '~/components/userCard'
import echarts from '~/components/Echarts'
export default {
  components: {
    userCard,
    echarts
  },
  data () {
    return {
      activeIndex: '',
      footerButton: false,
      srcList: ['https://p.ananas.chaoxing.com/star3/origin/20fdd2116f0cc8c7f9f7360f71bd1ab1.jpg']
    }
  },
  beforeMount () {
    window.addEventListener('scroll', throttle(this.handleScroll, 500))
  },
  beforeDestroy () {
    window.removeEventListener('scroll', throttle(this.handleScroll, 500))
  },
  methods: {
    handleSelect (e) {
      this.$router.push({
        path: `/${e}`

      })
    },
    handleScroll () {
      const scrollTop = document.documentElement.scrollTop
      if (scrollTop > 60) {
        this.footerButton = true
      } else {
        this.footerButton = false
      }
    },
    clickScroll () {
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style lang="less">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #f4f5f7;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
#default {

  .header {
    background-color: #ffffff;
    .header_w {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1280px;
      margin: 0 auto;
      h1 {
        padding: 0 20px;
        width: 120px;
      }
      .el-menu-demo {
        flex: 1;
      }
    }
  }
  .content {
    display: flex;
    width: 1280px;
    margin: 15px auto 25px;
    /*div {*/
    /*  border: 1px solid #000;*/
    /*}*/
    .content_user {
      flex: 1;
      margin-right: 20px;
      .content_img {
        min-height: 200px;
        padding: 15px;
        border-radius: 20px;
        border: 1px solid #e6e6e6;
        background-color: #ffffff;
        h3 {
          text-align: center;
        }
      }
    }
    .content_route {
      flex: 3;
    }
    .content_right {
      flex: 1;
      margin-left: 20px;
      border-radius: 20px;
      border: 1px solid #e6e6e6;
      background-color: #ffffff;

    }
  }
  .footer {
    font-size: 12px;
    p {
      text-align: center;
      color: #7F828B;
      a {
        color: #7F828B;
      }
    }
    .footer_button {
      position: fixed;
      bottom: 50px;
      right: 10px;
    }

  }

}

</style>
