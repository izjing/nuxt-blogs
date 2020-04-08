<template>
  <div class="user_card card">
    <template v-if="!isLogin">
      <div>
        账号：<el-input v-model="userInfo.userName" class="input_w" placeholder="请输入账号" />
      </div>
      <div>
        密码：<el-input v-model="userInfo.userPass" class="input_w mrt15" show-password placeholder="请输入密码" />
      </div>
      <div class="uc_loginbtn mrt15">
        <el-button @click="dialogSignup = true">
          注册
        </el-button>
        <el-button @click="login(userInfo)">
          登陆
        </el-button>
      </div>
      <!--    // 注册弹窗-->
      <el-dialog title="注册账号" width="330px" :center="true" :visible.sync="dialogSignup">
        <el-form :model="userSignup">
          <el-form-item label="昵称" label-width="'120px'">
            <el-input v-model="userSignup.name" placeholder="请输入昵称" class="input_w" autocomplete="off" />
          </el-form-item>
          <el-form-item label="账号" label-width="'120px'">
            <el-input v-model="userSignup.userName" placeholder="请输入账号" class="input_w" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" label-width="'120px'">
            <el-input v-model="userSignup.userPass" placeholder="请输入密码" show-password class="input_w" autocomplete="off" />
          </el-form-item>
          <el-form-item label="邮箱" placeholder="请输入邮箱" label-width="'120px'">
            <el-input v-model="userSignup.userEmail" class="input_w" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSignup = false">
            取 消
          </el-button>
          <el-button type="primary" @click="signup">
            确 定
          </el-button>
        </div>
      </el-dialog>
    </template>
    <template v-if="isLogin">
      <div class="uc_login">
        <div class="uc_login_name">
          {{ name }}
        </div>
        <div class="uc_login_content">
          <p>道阻且长</p>
          <p>行则将至</p>
        </div>
        <el-tooltip content="注销" placement="top">
          <el-button
            class="uc_login_btn"
            icon="el-icon-switch-button"
            size="mini"
            circle
            @click="logOff"
          />
        </el-tooltip>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
// import { setToken } from '../assets/utils'

export default {
  name: 'UserCard',
  data () {
    return {
      dialogSignup: false,
      userInfo: {
        userName: '',
        userPass: ''
      },
      userSignup: {
        userName: '',
        userPass: '',
        userEmail: ''
      }
    }
  },
  computed: {
    ...mapState('userInfo', {
      name: state => state.name
    }),
    ...mapGetters('userInfo', {
      isLogin: 'isLogin'
    })
  },
  methods: {
    async signup () {
      const res = await this.$axios.post('/signup', this.userSignup)
      if (res.code === 1) {
        this.dialogSignup = false
      }
    },
    ...mapActions('userInfo', {
      login: 'login'
    }),
    ...mapMutations('userInfo', {
      logOff: 'LOG_OFF'
    }),
    async findUser () {
      await this.$axios.post('/aaa', {
        userName: 'aaaa'
      })
      // console.log(ss, 1996)
    }
  }

}
</script>

<style scoped lang="less">
  .user_card {
    .input_w {
      width: 230px;
    }
    .uc_loginbtn {
      text-align: center;
    }
    .uc_login {
      min-height: 300px;
      background-size: cover;
      background-image: url("https://p.ananas.chaoxing.com/star3/origin/ebadcf74a88caa03f5cd4aaef5bd96d1.jpeg");
      position: relative;
      div {
        color: #ffffff;
      }
      .uc_login_name {
        position: absolute;
        bottom: 50px;
        left: 30px;
        font-weight: 700;
      }
      .uc_login_content {
        position: absolute;
        bottom: 25px;
        left: 115px;
        p:nth-last-child(1) {
          position: relative;
          left: 30px;
        }
      }
      .uc_login_btn {
        position: absolute;
        bottom: 5px;
        right: 10px;
      }
    }
  }

</style>
