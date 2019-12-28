<style lang="scss" scoped>
  .queryType {
    display: flex;
    justify-content:left;
    flex-wrap: wrap;
    padding: 10px;
    border: 1px solid #D7DAE3;
    background: #FFFFFF;
    .type {
      border: 1px solid #ffffff;
      padding: 5px;
      margin-right: 20px;
      cursor: pointer;
      span {
        color: #1f7bde;
      }
    }
    .type:hover {
      color: #1f7bde;
    }
    .active {
      background: #EAF5FF;
      border: 1px solid #1585FF;
      color: #1f7bde;
    }
  }
  .my-list-table-box{
    margin: 0;
    .my-list-table {
      .listTable td {
        padding: 5px 20px 5px 50px !important;
        line-height: 50px !important;
      }
      .listTable .introduce {
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:1;
      }
    }
  }
  .ivu-page {
    text-align: right;
  }
  .layContent {
    padding: 10px 24px 10px 1px;
    .ivu-row {
      margin-bottom: 12px;
      display: flex;
      font-size: 16px;
      .ivu-col-span-4 {
        padding: 10px;
        text-align: right;
        margin-right: 10px;
        font-weight: bold;
      }
      .title {
        width: 230px;
        text-align: right;
        font-weight: bold;
      }
      .info {
        text-align: left;
        padding: 10px;
        background: #D7DAE3;
        border-radius: 5px;
        .ivu-row {
          .ivu-checkbox-wrapper {
            font-size: 16px;
            width: 100%;
          }
        }
        .curLoad {
          cursor: pointer;
          font-size: 16px;
          color: #1585ff;
          float: right;
          margin-top: -4px;
        }
      }
    }
  }
  .ivu-modal-header span{
    font-size: 16px;
  }

</style>

<template>
    <div>
      <div class="my-breadCrumb">当前位置: 首页 - 支持实体 - 行业数据分享</div>
      <div class="my-content">
        <h3 class="my-menu-name">行业数据分享</h3>
        <div class="form-box" style="padding: 20px 28px 0px;">
          <Row class="queryType">
          <div class="type" v-for="item in typeData" :key="item.id" @click="clickSearch(item.theme_name,item.id)" :class="{active : active == item.theme_name}">
            {{item.theme_name}}(<span>{{item.cnt}}</span>)
          </div>
          </Row>
          <div class="inputSearch">
            <Input v-model="params.filesetName" placeholder="请输入关键字进行搜索" clearable @on-enter="searchFor()" />
            <Button type="primary" class="searchBtn" @click="searchFor()" >
              <Icon type="ios-search" />搜索
            </Button>
          </div>
          <div v-show="loadingStatus === false" class="my-list-table-box">
            <table class="my-list-table">
              <tr class="my-list-table-header">
                <th style="width: 20%" class="my-table-header1">数据集名称</th>
                <th style="width: 15%" class="my-table-header1">主题</th>
                <th style="width: 30%" class="my-table-header1">说明</th>
                <th style="width: 20%" class="my-table-header1">更新时间</th>
                <th style="width: 15%" class="my-table-header2">操作</th>
              </tr>
              <template v-for="(item,index) in tableData" >
                <tr class="my-list-table-content listTable">
                  <td>{{item.filesetName}}</td>
                  <td>{{item.themeName}}</td>
                  <td>
                    <div class="introduce">{{item.filesetDesc}}</div>
                  </td>
                  <td>{{item.updateTime}}</td>
                  <td @click="viewDetail(item)" style="color:#1585ff;">查看详情</td>
                </tr>
              </template>
            </table>
            <Page :total="total"
                  :current="params.pageNum"
                  :page-size="params.pageSize"
                  :page-size-opts="[5,10,50,100]"
                  show-sizer
                  show-total
                  placement="top"
                  @on-change="handlePage"
                  @on-page-size-change='handlePageSize'>
            </Page>
          </div>
          <div v-show="loadingStatus === true" style="text-align: center;margin-top: 120px">
            <Row>
              <Spin size="small" fix></Spin>
            </Row>
            <Row style="margin-top: 30px;margin-bottom: 30px">
              <Spin fix></Spin>
            </Row>
            <Row>
              <Spin size="large" fix></Spin>
            </Row>
          </div>
        </div>
        <div v-show="loadingStatus === ''" class="result-content" style="text-align: center;margin-top: 50px" >
          <img src="../../assets/img/null.png" alt="">
          <p class="result-text" style="font-size: 16px;color: #999999;">未查到数据!</p>
        </div>
      </div>
      <Modal class="dataShareModel" :mask-closable="false" v-model="openModal" width="620" :model="row">
        <p slot="header">
          <span v-model="row.name">{{row.name}}</span>
        </p>
        <div class="layContent">
          <Row>
            <Col span="4">主题:</Col>
            <Col span="19"><div class="info">{{row.type}}</div></Col>
          </Row>
          <Row>
            <Col span="4">说明:</Col>
            <Col span="19"><div class="info">{{row.intro}}</div></Col>
          </Row>
          <Row>
            <Col span="4">发布时间:</Col>
            <Col span="19"><div class="info">{{row.time}}</div></Col>
          </Row>
          <Row>
            <Col span="4">附件:</Col>
            <Col span="19">
              <div class="info" v-if="this.row.attachment && this.row.attachment.length !==0">
                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                  <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">全选</Checkbox>
                </div>
                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                  <Row v-for="item in this.row.attachment" :key="item.id">
                    <Checkbox :label="item.id">
                      {{item.fileName}}
                      <Button class="curLoad" @click="curLoad(item.id,item.fileName)" type="text">
                        下载
                      </Button>
                    </Checkbox>
                  </Row>
                </CheckboxGroup>
              </div>
            </Col>
          </Row>
        </div>
        <div slot="footer">
          <Button type="primary" :disabled="checkAll !== true" @click="AllLoad" :loading="loading">
            <span v-if="!loading">全部下载</span>
            <span v-else>Loading</span>
          </Button>
          <Button type="primary" @click="onCancel">关闭</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
  import {getThemeList, getDataList, downLoad} from "../../api/manageRisk";
    export default {
        name: "dataSharing",
        data() {
          return {
            loading: false,
            loadingStatus: false,
            indeterminate: true,
            checkAll: false,
            checkAllGroup: [],
            openModal: false,
            active: '',
            total: 0,
            params:{
              pageNum: 1,
              pageSize: 5,
              filesetName: '',
              themeId: ''
            },
            fileParams:{
              param: {
                filesetId: '',
                shareFileId: []
              }
            },
            row: {
              name: '',
              type: '',
              intro: '',
              time: '',
              attachment: [],
            },
            attachment: [],
            typeData: [
              {theme_name: '暂无数据',cnt:'0',id:1},
            ],
            tableData: []
          }
        },
        created() {
          this.getTypeData();
        },
        methods: {
          clickSearch(name,id) {
            this.loadingStatus = true;
            this.active = name;
            this.params.themeId = id;
            this.params.filesetName = '';
            this.params.pageNum = 1;
            this.getDataList();
          },
          getTypeData() {
            getThemeList().then(res => {
              this.typeData = res.data;
              //页面初始化默认第一个主题查询
              if(res.data.length>0) {
                this.active = res.data[0].theme_name;
                const firstParam = {
                  pageNum: 1,
                  pageSize: 5,
                  filesetName: '',
                  themeId: res.data[0].id
                }
                getDataList(firstParam).then(res => {
                  this.tableData = res.data.list;
                  this.total = res.data.totalCount;
                })
                this.params.themeId = firstParam.themeId
              }
            })
          },
          searchFor() {
            //校验非空和空格
            if( this.params.filesetName.match(/^[ ]+$/) || this.params.filesetName === '') {
              this.$Message.warning('请输入搜索内容!');
              return;
            }
            this.loadingStatus = true;
            this.active = '';
            this.params.themeId = ''
            this.params.pageNum = 1;
            this.getDataList();
          },
          //获取数据集列表
          getDataList () {
            getDataList(this.params).then(res => {
              if(res.data.list.length > 0){
                setTimeout(() => {
                  this.loadingStatus = false;
                  this.tableData = res.data.list;
                  this.total = res.data.totalCount;
                }, 1000);
              } else if(res.data.list.length === 0) {
                setTimeout(() => {
                  this.loadingStatus = '';
                }, 1000);
              }
          })
          },
          handlePage(value) {
            this.loadingStatus = true;
            this.params.pageNum = value
            this.getDataList()
          },
          handlePageSize(value) {
            this.loadingStatus = true;
            this.params.pageSize = value
            this.getDataList()
          },
          viewDetail(item) {
            this.openModal = true;
            this.row.name = item.filesetName;
            this.row.intro = item.filesetDesc;
            this.row.time = item.updateTime;
            this.row.type = item.themeName;
            this.row.attachment = item.fileList;
            this.fileParams.param.filesetId = item.id;
            //存附件-id
            if(item.fileList.length >0){
              item.fileList.forEach( curData => {
                this.attachment.push(curData.id);
              })
            }
          },
          onCancel() {
            this.openModal = false;
            this.fileParams = {
              param: {
                filesetId: '',
                shareFileId: []
              }
            };
            this.attachment = [];
            this.checkAllGroup = [];
          },
          //单附件下载
          curLoad(id,fileName) {
            this.fileParams.param.shareFileId.push(id);
            downLoad(this.fileParams).then(res => {
              setTimeout(() => {
                const blob = new Blob([res], {type: 'application/vnd.ms-excel;charset=utf-8'})
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName + '.zip';
                link.click();
                //不关闭弹出框--初始化附件id
                this.fileParams.param.shareFileId = []
                this.loading = false;
              }, 500);
            })
          },
          //多附件下载
          AllLoad() {
            this.loading = true;
            this.fileParams.param.shareFileId = this.attachment;
            downLoad(this.fileParams).then(res => {
              setTimeout(() => {
                const blob = new Blob([res], {type: 'application/vnd.ms-excel;charset=utf-8'})
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = this.row.name + '.zip';
                link.click();
                //不关闭弹出框--初始化附件id
                this.fileParams.param.shareFileId = []
                this.loading = false;
              }, 500);
            })
          },
          handleCheckAll () {
            if (this.indeterminate) {
              this.checkAll = false;
            } else {
              this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
              this.checkAllGroup = this.attachment;
            } else {
              this.checkAllGroup = [];
            }
          },
          checkAllGroupChange (data) {
            if (data.length === this.row.attachment.length) {
              this.indeterminate = false;
              this.checkAll = true;
            } else if (data.length > 0) {
              this.indeterminate = true;
              this.checkAll = false;
            } else {
              this.indeterminate = false;
              this.checkAll = false;
            }
          }
        },
    }
</script>

