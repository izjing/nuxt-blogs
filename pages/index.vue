<template>
  <div v-infinite-scroll="load" class="home">
    <div v-for="item in list" :key="item._id" class="home_img mrt15 shadow">
      <el-image
        style="width: 160px; height: 160px"
        src="https://p.ananas.chaoxing.com/star3/origin/20fdd2116f0cc8c7f9f7360f71bd1ab1.jpg"
      />
      <div class="mrl20 flex1">
        <h3>{{ item.title }}</h3>
        <div class="mrt15">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  async asyncData (context) {
    // console.log(context.$axios.get, 11122)
    const res = await context.$axios.get('/findwenzhang', { params: { page: 1 } })
    return {
      list: res.data,
      page: res.page
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.res)
  },
  methods: {
    async load () {
      let pages = this.page
      pages++
      const res = await this.$axios.get('/findwenzhang', { params: { page: pages } })
      console.log(res)
      const { code, data, page } = res
      if (code === 1 && data.length > 0) {
        this.page = page
        this.list.push(...res.data)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    max-height: 1025px;
    overflow: auto;
    border-radius: 20px;
    .home_img {
      min-height: 200px;
      padding: 15px;
      border-radius: 20px;
      border: 1px solid #e6e6e6;
      background-color: #ffffff;
      display: flex;
    }
  }

</style>
