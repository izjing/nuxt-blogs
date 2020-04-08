<template>
  <div v-infinite-scroll="load" class="home">
    <div v-for="item in list" :key="item._id" class="card mrt15" @click="linkArticle(item._id)">
      <div class="flex">
        <el-image
          style="width: 160px; height: 160px"
          :src="item.imgUrl"
        />
        <div class="mrl20 flex1">
          <h3>{{ item.title }}</h3>
          <div class="mrt15">
            {{ item.describe }}
          </div>
        </div>
      </div>
      <div class="mrt15">
        <el-button type="success" icon="el-icon-thumb" size="mini" circle @click.stop="dianzan(item._id)" />
        <!--        <el-button type="success" icon="el-icon-thumb" size="mini" @click="finDianzan" circle></el-button>-->
        <span>{{ item.dianzan }}</span>
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
      page: res.page || 1
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
    },
    async dianzan (id) {
      const res = await this.$axios.post('/dianzan', { id })
      const { code } = res
      if (code === 1) {
        this.list.forEach((item, index) => {
          if (item._id === id) {
            const add = this.list[index].dianzan += 1
            this.$set(this.list[index], 'dianzan', add)
          }
        })
      }
    },
    linkArticle (id) {
      this.$router.push({
        path: 'article',
        query: {
          id
        }
      })
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
      display: flex;
    }
  }

</style>
