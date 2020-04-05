import Vue from 'vue'
import echarts from 'echarts'
function echartsInit (idname, option) {
  const myChart = echarts.init(idname)
  myChart.setOption(option)
}
Vue.prototype.$echartsInit = echartsInit // 引入组件（将echarts注册为全局）
