<template>
  <el-row :gutter="20" class="nav">
    <el-col :span="16">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#525288"
        text-color="#fff"
      >
        <el-menu-item index="1"
          ><router-link class="el-icon-s-home" to="/"></router-link
        ></el-menu-item>
        <el-submenu index="2">
          <template #title
            ><router-link to="/keji">科技创新</router-link></template
          >
          <el-menu-item index="2-1">
            <router-link to="/project">立项管理</router-link></el-menu-item
          >
          <el-menu-item index="2-2">
            <router-link to="/keji">合同管理</router-link></el-menu-item
          >
          <el-menu-item index="2-3">
            <router-link to="/keji">实施管理</router-link></el-menu-item
          >
          <el-menu-item index="2-4">
            <router-link to="/keji">知识产权</router-link>
          </el-menu-item>
          <el-menu-item index="2-5">
            <router-link to="/keji">论文管理</router-link></el-menu-item
          >
          <el-menu-item index="2-6">
            <router-link to="/keji">工法管理</router-link></el-menu-item
          >
          <el-menu-item index="2-7">
            <router-link to="/keji">管理评价</router-link></el-menu-item
          >
        </el-submenu>
        <el-submenu index="3">
          <template #title>创新成果库</template>
          <el-menu-item index="3-1">
            <router-link to="/gongfalib">工法库</router-link></el-menu-item
          >
          <el-menu-item index="3-2">
            <router-link to="/zhuanli">知识产权库</router-link></el-menu-item
          >
          <el-menu-item index="3-3">
            <router-link to="/gongfalib">论文库</router-link>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template #title
            ><router-link to="/zhishi">技术知识库</router-link>
          </template>
          <el-menu-item index="4-1">
            <router-link to="/zhishi">施工组织设计</router-link></el-menu-item
          >
          <el-menu-item index="4-2">
            <router-link to="/zhishi">施工方案库</router-link></el-menu-item
          >
          <el-menu-item index="4-3">
            <router-link to="/zhishi">规程规范库</router-link>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="5">
          <router-link to="/bim">BIM培训</router-link></el-menu-item
        >
        <el-menu-item index="6"
          ><router-link to="/web">网站资源</router-link></el-menu-item
        >
        <el-submenu index="7">
          <template #title>web3d试验台</template>
          <el-menu-item index="7-1"
            ><el-link
              :underline="false"
              type="success"
              href="http://10.162.98.161:8900/rebeng/rebeng.html"
              target="blank"
              >热泵</el-link
            ></el-menu-item
          >
          <el-menu-item index="7-2"
            ><el-link
              :underline="false"
              type="success"
              href="http://10.162.98.161:8900/my_test_app/my_test_app.html"
              target="blank"
              >方盒</el-link
            ></el-menu-item
          >
          <el-menu-item index="7-3">
            <el-link
              :underline="false"
              type="success"
              href="http://10.162.98.161:8900/parametric_models/index.html"
              target="blank"
              >展示</el-link
            >
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>

    <el-col :span="4"></el-col>
    <el-col :span="2">
      <el-button class="el-icon-user" type="primary" round>{{
        this.$store.state.login.userInfo.username
      }}</el-button>
    </el-col>
    <el-col :span="2">
      <el-button class="el-icon-s-custom" type="warning" round @click="onLogout"
        >退出登录</el-button
      >
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "TopNav",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    onLogout() {
      this.$store.dispatch("clearUserInfo");
      this.$router.push("/login");
    },
  },
};
</script>



<style>
.nav {
  background: #525288;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
  color: rgb(17, 13, 13);
}
a:visited {
  text-decoration: none;
  color: rgb(61, 2, 2);
}
a:hover {
  color: red;
}
a:active {
  text-decoration: none;

  color: #fff;
}
el-link {
  text-decoration: none;
  color: #fff;
}
</style>