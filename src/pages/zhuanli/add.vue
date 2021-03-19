<template>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/gongfalib' }">工法列表</el-breadcrumb-item>
 <el-breadcrumb-item>添加工法</el-breadcrumb-item>
</el-breadcrumb>
  <div>
    <el-form
      ref="formProject"
      :inline="false"
      :model="formProject"
      :rules="rules"
    >
      <el-row :gutter="20" align="middle" justify="space-between" type="flex">
        <el-col :span="8">
          <el-form-item label="工法名称">
            <el-input
              v-model="formProject.name"
              placeholder="XX工法"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制单位">
            <el-input
              v-model="formProject.department"
              placeholder="XX技术公司"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编写人">
            <el-input v-model="formProject.writer" placeholder="xxx"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" align="bottom" justify="space-between" type="flex">
        <el-col :span="8">
          <el-form-item label="工法年度">
            <br />
            <el-select
              v-model="formProject.year"
              placeholder="请选择"
              class="ddlWidth"
            >
              <el-option
                v-for="item in options_year"
                :key="item.value_year"
                :label="item.label_year"
                :value="item.value_year"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工法等级">
            <br />
            <el-select
              v-model="formProject.class"
              placeholder="请选择"
              class="ddlWidth"
            >
              <el-option
                v-for="item in options_class"
                :key="item.value_class"
                :label="item.label_class"
                :value="item.value_class"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工法分类">
            <br />
            <el-select
              v-model="formProject.techField"
              placeholder="请选择"
              class="ddlWidth"
            >
              <el-option-group
                v-for="group in options_techField"
                :key="group.label_techField"
                :label="group.label_techField"
              >
                <el-option
                  v-for="item in group.options_techField"
                  :key="item.value_techField"
                  :label="item.label_techField"
                  :value="item.value_techField"
                >
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="内容摘要">
            <el-input
              type="textarea"
              :rows="3"
              v-model="formProject.summary"
              placeholder="xxx"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="http://localhost:3000/api/upload/gongfalib" 
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            :file-list="fileList"
            :disabled="uploadVisable"
         
            :limit="1"
          >
            <el-button size="small" type="primary">选取文件</el-button>

            <template #tip>
              <div class="el-upload__tip">只能上传 pdf 文件，且不超过 5Mb</div>
            </template>
          </el-upload>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit(formProject)"
          :disabled="ButtonDisabled"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ajax from "../../service/ajax";

export default {
  data() {
    return {
      dist:'gongfalib',
      uploadVisable: false,
      ButtonDisabled: true,
      formProject: {
        year: "2020",
        name: "科技创新管理系统",
        department: "技术中心",
        writer: "豆志远",
        class: "省部级",
        techField: "火电与输变电",
        summary: "123",
        attachment: "",
     
      },
      upload: {},
      options_year: [
        {
          value_year: "2016",
          label_year: "2016",
        },
        {
          value_year: "2017",
          label_year: "2017",
        },
        {
          value_year: "2018",
          label_year: "2018",
        },
        {
          value_year: "2019",
          label_year: "2019",
        },
        {
          value_year: "2020",
          label_year: "2020",
        },
        {
          value_year: "2021",
          label_year: "2021",
        },
        {
          value_year: "2022",
          label_year: "2022",
        },
        {
          value_year: "2023",
          label_year: "2023",
        },
        {
          value_year: "2024",
          label_year: "2024",
        },
      ],
      year: "",

      options_class: [
        {
          value_class: "企业级",
          label_class: "企业级",
        },
        {
          value_class: "省部级",
          label_class: "省部级",
        },
        {
          value_class: "国家级",
          label_class: "国家级",
        },
      ],
      class: "",

      options_techField: [
        {
          label_techField: "河南省工法",
          options_techField: [
            {
              value_techField: "房屋建筑工程",
              label_techField: "房屋建筑工程",
            },
            {
              value_techField: "土木工程",
              label_techField: "土木工程",
            },
            {
              value_techField: "工业安装工程",
              label_techField: "工业安装工程",
            },
          ],
        },
        {
          label_techField: "电建工法",
          options_techField: [
            {
              value_techField: "水电与新能源",
              label_techField: "水电与新能源",
            },
            {
              value_techField: "基础设施",
              label_techField: "基础设施",
            },
            {
              value_techField: "火电与输变电",
              label_techField: "火电与输变电",
            },
          ],
        },
      ],
      techField: "",

      rules: {
        year: [{ required: true, message: "请输入年度", trigger: "blur" }],
        name: [{ required: true, message: "请输入项目名称", trigger: "blue" }],
      },
    };
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
  },
  mounted() {
    //console.log( this.$store.state.login.userInfo.token)
  },
  methods: {
    modalUploadOpen(fileList) {
      this.$alert(fileList.originalname, "上传成功", {
        confirmButtonText: "确定",
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleUploadSuccess(fileList) {
      console.log("this.fileList=" + fileList.originalname);
      this.ButtonDisabled = false;
      this.formProject.attachment = "upload/gongfalib/" + fileList.originalname;

      this.uploadVisable = true;
      this.modalUploadOpen(fileList);
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    onSubmit(formProject) {
      ajax
        .post("api/gongfalib", formProject)
        .then((res) => {
          this.feedback = res.data;

          // console.log("this.feedback=" + this.feedback);
          this.$router.push("/gongfalib");
        })
        .catch((error) => {
          console.log("err+" + error);
        });
    },
  },
};
</script>

<style>
.ddlWidth {
  width: 100%;
}
</style>
