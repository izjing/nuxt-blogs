<template>
  <div>
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="formData.describe" type="textarea" />
      </el-form-item>
      <el-form-item label="封面地址">
        <el-input v-model="formData.imgUrl" />
      </el-form-item>
    </el-form>
    <div class="mavonEditor">
      <no-ssr>
        <mavon-editor v-model="formData.content" />
      </no-ssr>
    </div>
    <el-button type="primary" @click="onSubmit">
      立即创建
    </el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        title: '',
        describe: '',
        content: '',
        imgUrl: ''
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
