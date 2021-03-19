<!--FileOverView-->
<template>
    <div class="fileOverViewBox">
        <div class="fileOverViewContentBox">
            <div v-if="fileType==='pdf'">
                <div style="height:60px;">
                    <div class="arrow rowCenter">
                        <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage===1}">上一页</span>
                        <div class="pageBox rowCenter">
                            <span> {{currentPage}}</span>
                            <span>/</span>
                            <span>{{pageCount}}</span>
                        </div>
                        <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage===pageCount}">下一页</span>
                    </div>
                </div>
                <pdf
                        :src="src"
                        :page="currentPage"
                        @num-pages="pageCount=$event"
                        @page-loaded="currentPage=$event"
                        @loaded="loadPdfHandler">
                </pdf>
            </div>
            <div v-if="/docx/.test(fileType)" v-html="viewHtml" class="docViewBox"></div>

        </div>

    </div>
</template>

<script>
    import pdf from 'vue-pdf'
    import mammoth from 'mammoth'
    // import axios from 'axios'
    export default {
        name: 'content',
        components: {
            pdf
        },
        data () {
            return {
                currentPage: 0, // pdf文件页码
                pageCount: 0, // pdf文件总页数
                fileType: '', // 文件类型 src: '', // pdf文件地址
                src: '', // pdf文件地址
                viewHtml:'',//网页字符串
            }
        },
        async created(){ // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
            //let {url}=this.$route.query
            let url=this.$store.state.gongfalib.url
            console.log(url)
            let fileName=url.split('/')[url.split('/').length-1]
            this.fileType=fileName.split('.')[1]
            if(/pdf/.test(this.fileType)){
                this.src = pdf.createLoadingTask(url)
            }else if(/docx/.test(this.fileType)){
                // let res=await axios({
                //     url,
                //     withCredentials:false,
                //     responseType:'arraybuffer'
                // })
                mammoth.convertToHtml({arrayBuffer: url})
                    .then(result=>{
                        console.log(result.value)
                        this.viewHtml=result.value
                    })
                    .done()

            }else {
                alert('文件格式不支持，仅支持pdf,docx文件预览')
            }
        },
        methods: {
            // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
            changePdfPage(val) {
                // console.log(val)
                if (val === 0 && this.currentPage > 1) {
                    this.currentPage--
                    // console.log(this.currentPage)
                }
                if (val === 1 && this.currentPage < this.pageCount) {
                    this.currentPage++
                    // console.log(this.currentPage)
                }
            },
            // pdf加载时
            loadPdfHandler() {
                this.currentPage = 1 // 加载的时候先加载第一页
            }

        }
    }
</script>

<style scoped lang="scss">
    .fileOverViewBox{
        background:#000000;
        min-width:100vh;
        .fileOverViewContentBox{
            width:1000px;
            margin:0 auto;
            background:#ffffff;
            .arrow{
                position: fixed;
                width:100%;
                height:60px;
                z-index: 100;
                -webkit-box-shadow: 0 2px 2px rgba(0,0,0,0.5);
                -moz-box-shadow: 0 2px 2px rgba(0,0,0,0.5);
                box-shadow:  0 2px 2px rgba(0,0,0,0.5);
                background:rgba(255,255,255,0.9);
                .turn{
                    cursor:pointer;
                    &:hover{
                        color:#58A5FE;
                    }
                }
                .pageBox{
                    margin:0 20px;
                }
            }
            .docViewBox{
                padding:20px;
            }
        }
    }


</style>
