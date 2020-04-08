<template>
  <div>
    <div ref="echarts" style="height: 200px" />
  </div>
</template>

<script>
export default {
  name: 'Echarts',
  data () {
    return {
      echartsData: {
        zan: 0,
        user: 0,
        article: 0,
        messageBoard: 0,
        about: 0
      }
    }
  },
  watch: {
    echartsData () {
      this.$echartsInit(this.$refs.echarts, {
        title: {
          text: '日常统计',
          subtext: '移入显示数量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['所有点赞', '用户数量', '文章数量', '留言数量', '说说数量']
        },
        series: [
          {
            name: '历史统计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: this.echartsData.zan, name: '所有点赞' },
              { value: this.echartsData.user, name: '用户数量' },
              { value: this.echartsData.article, name: '文章数量' },
              { value: this.echartsData.messageBoard, name: '留言数量' },
              { value: this.echartsData.about, name: '说说数量' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  },
  async mounted () {
    const res = await this.$axios.get('/findAllZan')
    if (res.code === 1) {
      this.echartsData = res.data
    }
  }
}
</script>

<style scoped>

</style>
