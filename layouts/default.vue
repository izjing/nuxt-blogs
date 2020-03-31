<template>
  <div id="default">
    <div class="header">
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
    <div class="content">
      <div class="content_user">
        <user-card />
      </div>
      <div class="content_route">
        <nuxt />
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
import userCard from '../components/userCard'
import { throttle } from '../assets/utils'
export default {
  components: {
    userCard
  },
  data () {
    return {
      activeIndex: '',
      footerButton: false
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
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
#default {
  width: 1280px;
  margin: 0 auto;
  .header {
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      padding: 0 20px;
      width: 120px;
    }
    .el-menu-demo {
      flex: 1;
    }
  }
  .content {
    display: flex;
    margin-top: 20px;
    div {
      border: 1px solid #000;
    }
    .content_user {
      flex: 1;
      margin-right: 20px;
    }
    .content_route {
      flex: 3;
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
