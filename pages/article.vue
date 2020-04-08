<template>
  <div class="mavonEditor">
    <div class="mrb15">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">
          文章
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <no-ssr>
      <mavon-editor
        v-model="article.content"
        default-open="preview"
        :editable="false"
        :subfield="false"
        :toolbars-flag="false"
      />
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'Article',
  async asyncData (context) {
    console.log(context.query, 11122)
    const id = context.query.id
    const res = await context.$axios.get('/findOneArticle', { params: { page: 1, id } })
    return {
      article: res.data[0]
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
  .mavonEditor {
    width: 100%;
    height: 100%;
  }
</style>
