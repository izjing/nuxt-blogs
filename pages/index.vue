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
  components: {
  },
  async asyncData (context) {
    // console.log(context.$axios.get, 11122)
    const res = await context.$axios.get('/findwenzhang', { params: { page: 1, userName: context.store.state.userInfo.userName } })
    return {
      list: res.data,
      page: res.page || 1
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('userInfo', {
      userName: state => state.userName
    })
  },
  mounted () {
    // console.log(this.res)
  },
  methods: {
    async load () {
      let pages = this.page
      pages++
      const res = await this.$axios.get('/findwenzhang', { params: { page: pages, userName: this.userName } })
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
            this.$set(this.list[index], 'isZan', true)
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
