<template>
  <div>
    <div class="my-breadCrumb">当前位置: 首页 - 风控API - 监管法规查询</div>
    <div class="my-content" style="min-height: 80vh !important;">
      <div class="codeSearch">
        <div class="searchInput" :class="clickShow">
          <Input v-model="params.query" placeholder="请输入关键字进行搜索" clearable @on-enter="searchFor()" />
          <Button type="primary" class="searchBtn" @click="searchFor()" >
            <Icon type="ios-search" />搜索
          </Button>
        </div>
<!--        <div v-if="clickShow !== 'display'" class="contents">-->
<!--          <div v-show="loadingStatus === true" style="text-align: center;margin-top: 120px">-->
<!--            <Row>-->
<!--              <Spin size="small" fix></Spin>-->
<!--            </Row>-->
<!--            <Row style="margin-top: 30px;margin-bottom: 30px">-->
<!--              <Spin fix></Spin>-->
<!--            </Row>-->
<!--            <Row>-->
<!--              <Spin size="large" fix></Spin>-->
<!--            </Row>-->
<!--          </div>-->
<!--          <div v-show="noData === false">-->
<!--            <div class="totals">为您找到相关结果约<span style="color: red;font-weight: bold">{{total}}</span>条!</div>-->
<!--            <div v-for="data in contentData"  @click="searchDetail($event)" :id="data.id" :key="data.id" style="background:#eee;padding-left: 20px;padding-right:20px;padding-top: 5px">-->
<!--              <Card :bordered="false">-->
<!--                <p v-if="data.highlightTitle !== ''" v-html="data.highlightTitle" slot="title" style="font-size: 16px!important">{{data.highlightTitle}}</p><span style="font-size: 16px !important;margin-left: 10px;float: right;margin-top: -45px;" class="publishTime">发布时间:{{data.strcreateTime}}</span>-->
<!--                <p v-if="data.highlightTitle === ''" slot="title" style="font-size: 16px!important">{{data.title}}</p><span style="font-size: 16px !important;margin-left: 10px;float: right;margin-top: -45px;" class="publishTime">发布时间:{{data.strcreateTime}}</span>-->
<!--                <p v-html="data.attachment.highlightContent" style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;font-size: 16px!important;">{{data.attachment.highlightContent}}</p>-->
<!--              </Card>-->
<!--            </div>-->
<!--            <Page :total="total"-->
<!--                  :current="params.pageNum"-->
<!--                  :page-size="params.pageSize"-->
<!--                  :page-size-opts="[5,10,50,100]"-->
<!--                  show-sizer-->
<!--                  show-total-->
<!--                  placement="top"-->
<!--                  @on-change="handlePage"-->
<!--                  @on-page-size-change='handlePageSize'>-->
<!--            </Page>-->
<!--          </div>-->
<!--          <div v-show="noData === true" class="result-content" style="text-align: center;margin-top: 50px" >-->
<!--            <img src="../../assets/img/null.png" alt="">-->
<!--            <p class="result-text" style="font-size: 16px;color: #999999;">未查到数据!</p>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import { getCodeSearch } from "../../api/manageRisk";
  import {readmsg} from "../../api/review";

  export default {
      name: "codeSearch",
      data() {
        return {
          clickShow: 'display',
          contentData: [],
          detailData:{},
          noData:false,
          loadingStatus: false,
          total: 0,
          params:{
            pageNum: 1,
            pageSize: 5,
            query: ''
          },
        }
      },
      created(){
        // 消息
        readmsg()
      },
      methods: {
        //检索查询
        searchFor() {
          //校验非空和空格
          if( this.params.query.match(/^[ ]+$/) || this.params.query === '') {
            this.$Message.warning('请输入搜索内容!');
            return;
          }
          //点击触发
          this.clickShow = 'showAnimation';
          this.loadingStatus = true;
          this.noData = '';
          this.params.pageNum = 1;
          this.getSearchInfo();
        },
        getSearchInfo() {
          getCodeSearch(this.params).then(res => {
            if( res.code === '10000') {
              //服务异常
              this.$Message.error('后台服务异常!')
            } else {
              //正常返回
              if( 'content' in res.result) {
                if(res.result.content.length !== 0){
                  setTimeout(() => {
                    this.loadingStatus = false;
                    this.noData = false;
                    const hightTitle = [];
                    const title = [];
                    res.result.content.map(function(track) {
                      if(track.highlightTitle === ''){
                        title.push(track);
                      } else {
                        hightTitle.push(track);
                      }
                    })
                    this.contentData = hightTitle.concat(title);
                    this.total = res.result.totalElements;
                  }, 1000);
                } else if (res.result.content.length === 0) {
                  //正常返回，数据为空
                  setTimeout(() => {
                    this.loadingStatus = false;
                    this.noData = true;
                  }, 1000);
                }
              }
            }

          })
        },
        handlePage(value) {
          this.loadingStatus = true;
          this.noData = '';
          this.params.pageNum = value
          this.getSearchInfo()
        },
        handlePageSize(value) {
          this.loadingStatus = true;
          this.noData = '';
          this.params.pageSize = value
          this.getSearchInfo()
        },
        searchDetail(e) {
          const id = e.currentTarget.id;
          const {href} = this.$router.resolve({
            path: "/codeSearchDetail",
            query: {
              id: id
            }
          })
          window.open(href, '_blank')
        }
      }
    }
</script>

<style lang="scss">
    .codeSearch {
      .searchInput {
        text-align: center;
        padding-top: 280px;
        /*margin-top: 280px;*/
      }
      .showAnimation {
        text-align: left !important;
        margin-left: 20px !important;
        margin-top: 18px !important;
        .ivu-input-default {
          border: 1px solid #429dff;
          width: 300px;
          height: 40px;
        }
        .searchBtn {
          height: 42px;
        }
        .ivu-input-icon-clear {
          margin-top: 2px;
          margin-right: 5px;
        }
      }
      .contents {
        margin-top: 15px;
        .totals {
          margin-left: 20px;
        }
        .ivu-card-head {
          padding: 10px 16px;
          cursor: pointer;
          span {
            font-size: 16px !important;
          }
        }
        .ivu-card-head:hover {
          background: #EFF2FF;
        }
      }
    }

    .showAnimation {
      animation: myfirst 500ms;
      -moz-animation: myfirst 500ms;	/* Firefox */
      -webkit-animation: myfirst 500ms;	/* Safari 和 Chrome */
      -o-animation: myfirst 500ms;	/* Opera */
    }
    @keyframes myfirst
    {
      from {margin-left: 260px;margin-top: 280px;}
      to {margin-left: 20px;margin-top: 18px;}
    }
    @-moz-keyframes myfirst /* Firefox */
    {
      from {margin-left: 260px;margin-top: 280px;}
      to {margin-left: 20px;margin-top: 18px;}
    }
    @-webkit-keyframes myfirst /* Safari 和 Chrome */
    {
      from {margin-left: 260px;margin-top: 280px;}
      to {margin-left: 20px;margin-top: 18px;}
    }
    @-o-keyframes myfirst /* Opera */
    {
      from {margin-left: 260px;margin-top: 280px;}
      to {margin-left: 20px;margin-top: 18px;}
    }
</style>
