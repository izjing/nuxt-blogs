<template>
  <div v-infinite-scroll="mBLoad" class="about">
    <div class="ovh">
      <el-input
        v-model="content"
        type="textarea"
        placeholder="请输入内容"
        :rows="5"
        maxlength="200"
        show-word-limit
      />
      <el-button class="mrt15 text_btn" @click="addAbout">
        发布
      </el-button>
    </div>
    <div v-for="item of list" :key="item._id" class="about_content card mrt15">
      <div class="align_center flex">
        <el-image
          style="width: 60px; height: 60px; border-radius: 50%"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="cover"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
        <div class="mrl20">
          <h2>{{ item.name }}</h2>
          <div>{{ item.time }}</div>
        </div>
      </div>
      <div class="mrt15">
        {{ item.content }}
      </div>
      <div class="mrt15">
        <div class="about_zan cursor_pointer" @click.stop="dianzan(item._id)">
          <i :class="['el-icon-thumb',{'zan_color': item.isZan}]" />
          <span>{{ item.dianzan }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MessageBoard',
  async asyncData (context) {
    // console.log(context.$axios.get, 11122)
    const res = await context.$axios.post('/findMb', { page: 1, userName: context.store.state.userInfo.userName })
    console.log(res)
    return {
      list: res.data,
      page: res.page || 1
    }
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {
    ...mapState('userInfo', {
      userName: state => state.userName
    })
  },
  methods: {
    async mBLoad () {
      let pages = this.page
      pages++
      const res = await this.$axios.post('/findMb', { page: pages, userName: this.userName })
      const { code, data, page } = res
      if (code === 1 && data.length > 0) {
        this.page = page
        this.list.push(...res.data)
      }
    },
    async addAbout () {
      const res = await this.$axios.post('/addMb', {
        content: this.content
      })
      if (res.code === 1) {
        this.content = ''
        this.$message.success(res.msg)
        res.data.dianzan = 0
        this.list.unshift(res.data)
      }
    },
    async dianzan (id) {
      const res = await this.$axios.post('/dianzan', { id })
      const { code } = res
      if (code === 1) {
        this.list.forEach((item, index) => {
          if (item._id === id) {
            const add = this.list[index].dianzan += 1
            this.$set(this.list[index], 'dianzan', add)
            this.$set(this.list[index], 'isZan', true)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .about {
    overflow: auto;
    max-height: 1025px;
    .text_btn {
      float: right;
    }
    /*.about_content {*/
    /*  .about_c_header {*/
    /*    display: flex;*/
    /*  }*/
    /*}*/
  }

</style>
