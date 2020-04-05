<template>
  <div>
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="formData.content" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          立即创建
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      const res = await this.$axios.post('/wenzhang', this.formData)
      console.log(res)
    }
  }

}
</script>
<style scoped>

</style>
