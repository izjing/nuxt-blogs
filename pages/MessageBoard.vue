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
          <h2>{{ item.userName }}</h2>
          <div>{{ item.time }}</div>
        </div>
      </div>
      <div class="mrt15">
        {{ item.content }}
      </div>
      <div class="mrt15">
        <el-button type="success" icon="el-icon-thumb" size="mini" circle @click="dianzan(item._id)" />
        <span>{{ item.dianzan }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBoard',
  async asyncData (context) {
    // console.log(context.$axios.get, 11122)
    const res = await context.$axios.post('/findMb', { page: 1 })
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
  methods: {
    async mBLoad () {
      let pages = this.page
      pages++
      const res = await this.$axios.post('/findMb', { page: pages })
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
      console.log(res)
    },
    async dianzan (id) {
      const res = await this.$axios.post('/dianzan', { id })
      console.log(res)
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
