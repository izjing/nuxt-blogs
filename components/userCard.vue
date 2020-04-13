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
      <el-dialog title="注册账号" width="450px" :center="true" :visible.sync="dialogSignup">
        <el-form ref="dialogForm" :rules="rules" :model="userSignup">
          <el-form-item label="昵称" label-width="'120px'" prop="name">
            <el-input v-model="userSignup.name" placeholder="请输入昵称" class="input_w" autocomplete="off" />
          </el-form-item>
          <el-form-item label="账号" label-width="'120px'" prop="userName">
            <el-input v-model="userSignup.userName" placeholder="请输入账号" class="input_w" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" label-width="'120px'" prop="userPass">
            <el-input v-model="userSignup.userPass" placeholder="请输入密码" show-password class="input_w" autocomplete="off" />
          </el-form-item>
          <el-form-item label="邮箱" label-width="'200px'" prop="userEmail">
            <el-input v-model="userSignup.userEmail" placeholder="请输入邮箱" class="input_w" autocomplete="off" />
            <el-button :disabled="!show" @click="send">
              <span v-show="show">获取验证码</span>
              <span v-show="!show" class="count">{{ count }} s</span>
            </el-button>
          </el-form-item>
          <el-form-item label="验证码" label-width="'120px'" prop="authCode">
            <el-input v-model="userSignup.authCode" placeholder="请输入验证码" class="input_w" autocomplete="off" />
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
const TIME_COUNT = 60
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
        authCode: '',
        userEmail: ''
      },
      show: true,
      count: 0,
      timer: null,
      rules: Object.freeze({
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        userPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        authCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur' }
        ],
        userEmail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      })
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
    signup () {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          const res = await this.$axios.post('/signup', this.userSignup)
          if (res.code === 1) {
            this.$message.success(res.msg)
            this.dialogSignup = false
            this.$refs.dialogForm.resetFields()
          }
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    ...mapActions('userInfo', {
      login: 'login'
    }),
    ...mapMutations('userInfo', {
      logOff: 'LOG_OFF'
    }),
    // 发送邮箱验证码
    async send () {
      if (!this.timer) {
        const res = await this.$axios.post('/loginMail', { email: this.userSignup.userEmail, userName: this.userSignup.userName })
        const { code, msg } = res
        if (code === 1) {
          this.$message.success(msg)
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer) // 清除定时器
              this.timer = null
            }
          }, 1000)
        }
      }
    },
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
