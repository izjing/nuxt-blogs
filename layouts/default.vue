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
          <el-menu-item index="about">
            说说
          </el-menu-item>
          <el-menu-item index="write">
            写文章
          </el-menu-item>
          <el-menu-item class="login" index="login">
            登陆
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="content">
      <div class="flex1 mrr20 content1">
        <user-card />
        <div class="card mrt15">
          <h3 class="text_center">
            公众号
          </h3>
          <el-image
            style="width: 280px; height: 280px"
            src="https://p.ananas.chaoxing.com/star3/origin/20fdd2116f0cc8c7f9f7360f71bd1ab1.jpg"
            :preview-src-list="srcList"
          />
        </div>
        <div class="card mrt15">
          <echarts />
        </div>
      </div>
      <div class="content_route">
        <nuxt />
      </div>
      <div class="card flex1 mrl20 content2">
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
  asyncData (context) {
    console.log(context, 8888)
  },
  data () {
    return {
      activeIndex: this.$route.name === 'index' ? '' : this.$route.name,
      footerButton: false,
      srcList: ['https://p.ananas.chaoxing.com/star3/origin/20fdd2116f0cc8c7f9f7360f71bd1ab1.jpg']
    }
  },
  beforeMount () {
    console.log(this.$route)
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
.login {
  display: none;
}
@media only screen and (max-width: 769px) {
  // 区分移动端pc端的样式
  .content1, .content2, .footer {
    display: none;
  }
  .login {
    display: block;
  }
}

@media only screen and (min-width: 769px) and (max-width: 1270px) {
  // 区分中屏幕的样式
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
  .content2 {
    display: none;
  }
}

@media only screen and (min-width: 1270px){
  // 区分大屏幕的样式
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
}

</style>
