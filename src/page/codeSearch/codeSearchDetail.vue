<style lang="scss">
  .contentInfo {
    min-height: calc(100vh - 70px);
    background: #EFF2FF;
    .info {
      padding: 30px 200px 30px 200px;
      .title {
        text-align: center;
        font-size: 20px;
      }
      .detail {
        font-size: 16px;
        text-align: left;
        letter-spacing: 2px;
      }
      .publishTime {
        margin-bottom: 15px;
        font-size:15px;
        text-align: right;
      }
    }
  }
</style>


<template>
  <div>
    <api-header></api-header>
    <div class="contentInfo">
      <div class="info">
        <div class="title">{{contentData.title}}</div>
        <div class="publishTime">发布时间:{{contentData.strcreateTime}}</div>
        <textarea class="detail">
          {{contentData.content}}
        </textarea>
      </div>
    </div>
  </div>
 </template>

<script>
  import { getCodeSearchDetail } from "../../api/manageRisk";
  import apiHeader from '../../components/apiHeader';
    export default {
        name: "codeSearchDetail",
        data() {
          return {
            contentData:{
              title: '--',
              strcreateTime: '--',
              content: '',
            },
          }
        },
        components: {
          apiHeader
        },
        mounted:function() {
            this.searchForById();
        },
        methods: {
          searchForById() {
            const  url = 'api/docs/preview?docId='+this.$route.query.id;
            getCodeSearchDetail(url).then(res => {
              this.contentData.title = res.result.title;
              this.contentData.strcreateTime = res.result.strcreateTime;
              this.contentData.content = res.result.attachment.content;
              document.title = res.result.title;
            })
          },
        }
    }
</script>
