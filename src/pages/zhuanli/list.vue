<template>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/gongfalib' }">知识产权列表</el-breadcrumb-item>
 
</el-breadcrumb>
  <el-table :data="patents" style="width: 100%">
    <el-table-column label="序号" type="index" width="50"></el-table-column>
    <el-table-column prop="name" label="知识产权名称" width="200"></el-table-column>
    
    <el-table-column prop="inventor" label="发明人" width="80"></el-table-column>
    <el-table-column prop="applyTime" label="申请时间" width="80"></el-table-column>
    <el-table-column prop="authorizeTime" label="授权时间" width="80"></el-table-column>

    

    <el-table-column
      prop="category"
      label="知识产权类别"
      width="120"
    ></el-table-column>
    <el-table-column
      prop="patentNumber"
      label="专利号"
      width="120"
    ></el-table-column>
   
    
    <el-table-column fixed="right" label="操作" width="300">
      <template #default="scope">
        <el-space :size="size" >


          <el-button v-if="scope.row.attachment" @click="downloadGongfalib(scope.row.attachment)"  type="text"
            size="small">下载工法</el-button>
          
          <el-button
            @click="viewGongfalib(scope.row._id)"
            type="text"
            size="small"
            >查看工法</el-button
          >



          <el-button
            @click="editGongfalib(scope.row._id)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button
            @click="deleteGongfalib(scope.row._id)"
            type="text"
            size="small"
            >删除</el-button
          >
        </el-space>
      </template>
    </el-table-column>
  </el-table>

  <span><router-link to="/gongfalib/add">新增知识产权</router-link></span>
</template>

<script>
import ajax from "../../service/ajax";

export default {
  data() {
    return {
      size:20,
      patents: [],
    };
  },
  computed: {
    // gongfalibs() {
    // return this.$store.getters.gongfalibs;
    // },
  },
  mounted() {
    this.getPatents();
    console.log("表格数据已获取");
  },
  methods: {
     goBack() {
        console.log('go back');
         this.$router.go(-1)
      },

    getPatents() {
      ajax
        .get("api/zhuanli")
        .then((res) => {
          // console.log(res.data.gongfalibs);
          this.patents = res.data.patents;
          this.$store.dispatch("setGongfalibs", res.data.patents);
          // console.log("this.gongfalibs:" + this.gongfalibs);
          // console.log("this.$store.state:" + this.$store.state);
        })
        .catch((err) => console.log(err));
    },

    editGongfalib(id) {
      this.$router.push({ path: `/gongfalib/${id}/edit` });
    },
 downloadGongfalib(attachment) {
   window.location.href=`http://localhost:3000/${attachment.substring(7)}`
 },
     
    viewGongfalib(id) {
      ajax.get(`api/gongfalib/${id}`).then((res) => {

 this.$store.dispatch("setUrl", `http://localhost:3000/${res.data.attachment.substring(7)}`);
this.$router.push({ path: `/gongfalib/${id}/content` });
     // window.location.href =`http://localhost:3000/${res.data.attachment.substring(7)}`;
       })    
    },

    deleteGongfalib(id) {
      ajax
        .delete(`api/gongfalib/${id}`)
        .then((res) => {
          this.feedback = res.data;
          console.log(this.feedback);
          this.$router.go(0);
        })
        .catch((error) => {
          console.log("err+" + error);
        });
    },

    fieldFormat: function (row, column) {
      var field = row[column.property];
      if (field == undefined) {
        return "";
      } else {
        console.log("field:" + typeof field);
        field.forEach(function (value) {
          if (value.length > 1) {
            console.log("value:" + value);
            value.shift();
            console.log("value:" + value);
          }
        });
        return field.join(" , ");
      }
    },
    urlFormat: function (row, column) {
     
      var url = row[column.property];
      if (url == undefined) {
        return "";
      }
      return `<a href="http://localhost:3000/${url.substring(7)}">查看工法</a>`;
    },
  },
};
</script>

<style>
.el-table__header tr,
.el-table__header th,
.el-table__header cell {
  background: #409eff;
  height: 30px;
  padding: 0;
  color: white;
}
</style>
