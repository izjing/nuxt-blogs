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
      aa: ''
    }
  },
  watch: {
    aa () {
      this.$echartsInit(this.$refs.echarts, {
        title: {
          text: '日常统计',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '用户数量', '访问数量']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '用户数量' },
              { value: 234, name: '访问数量' }
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
  mounted () {
    this.aa = 1
  }
}
</script>

<style scoped>

</style>
