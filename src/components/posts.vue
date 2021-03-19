<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }">
    <template #header>
      <div class="card-header">
        <span class="text">{{ postsName }}</span>
        <el-button class="button" type="text"  @click="onSubmit()">更多</el-button>
      </div>
    </template>
    <div v-for="(item,index) in top5Posts" :key="item.id" >
      <el-row :gutter="20">
        <el-col :span="18">
          <router-link :to="`/post/${index}/content`"><p class="title">{{ item.title }}</p></router-link></el-col
        >
        <el-col :span="6">
          <p class="title">{{ item.time }}</p></el-col
        >
      </el-row>
    </div>
  </el-card>
</template>

<script>
import ajax from "../service/ajax";

export default {
  data() {
    return {
      posts: [],
    };
  },

  computed: {
    top5Posts() {
      return this.$store.getters.posts.slice(0, 8);
    },
  },
  props: ["postsName"],
  methods: {
    getPosts() {
      ajax
        .get("api/post")
        .then((res) => {
          console.log(res.data);
          // this.posts = res.data.posts;
          this.$store.dispatch("setPosts", res.data.posts);
          console.log(this.$store.state)
        })
        .catch((err) => console.log(err));
    },

onSubmit(){
       this.$router.push({ path: '/post'});
    }

  },
  mounted() {
    this.getPosts();
  },
};
</script>

<style scoped>
p,
.title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  padding-left: 10px;

  text-align: left;
}
.el-row {
  margin: 0px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.box-card {
  width:100%
}
body-style{
  padding: '0px'
}
</style>