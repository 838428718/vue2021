<template>
  <div>
    {{ gongfalib.attachment }}
    {{ pdf }}
    <input id="document" type="file" />
    <div v-html="vHtml" />
  </div>
</template>

<script>
import ajax from "../../service/ajax";
import mammoth from "mammoth";
export default {
  data() {
    return {
      vHtml: "",
      gongfalib: {},
      pdf: "",
    };
  },

  mounted() {
    this.getProject(this.$route.params.id);
    console.log("表格数据已获取");
    document
      .getElementById("document")
      .addEventListener("change", this.uploading, false);
  },

  computed: {
    project() {
      return this.$store.getters.project;
    },
  },
  methods: {
    uploading(event) {
      const that = this;
      var file = event.target.files[0]; // 获取文件
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function (e) {
        const buffer = e.target.result; // 此时是arraybuffer类型
        mammoth
          .convertToHtml({ arrayBuffer: buffer })
          .then((result) => {
            console.log(result);
            that.vHtml = result.value;
          })
          .done();
      };
    },

    getProject(id) {
      ajax.get(`api/gongfalib/${id}`).then((res) => {
        console.log(res.data);
        this.gongfalib = res.data;
        ajax.get(`api/upload/?url=${res.data.attachment}`).then((result) => {
          console.log(result.data);
          this.pdf = result.data;
        });
        // this.$store.dispatch("setProject", res.data);
      });
    },
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

