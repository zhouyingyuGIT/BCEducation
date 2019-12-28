import fetch from '../utils/fetch'


//数据复核——提交申请
export function applyCommit(params) {
  return fetch({
    url:'/api/apply/commit',
    data:params,
    method:'post'
  })
}

//数据复核——提交申请列表
export function applyCommitList(params) {
  return fetch({
    url:'/api/apply/commit/list',
    data:params,
    method:'post'
  })
}

//数据复核——查看提交申请详情
export function applyCommitDetail(params) {
  return fetch({
    url:'/api/apply/commit/detail?id=' + params,
    method:'get'
  })
}



//数据复核-查看提交申请详情-文件下载
export function applyFiledownload(params) {
  return fetch({
    url:`api/apply/file/download?fileId=` + params,
    method:'get',
    responseType : 'arraybuffer'
  })
}


//数据复核——待我处理申请列表
export function applyCheckList(params) {
  return fetch({
    url:'/api/apply/check/list',
    data:params,
    method:'post'
  })
}

//数据复核——查看待我处理详情
export function applyCheckDetail(params) {
  return fetch({
    url:'/api/apply/check/detail?id=' + params ,
    method:'get'
  })
}


//数据复核-拒绝
export function applyReject(params) {
  return fetch({
    url:'/api/apply/check/detail',
    data:params,
    method:'post'
  })
}

//数据复核-api名称列表
export function applyApiList() {
  return fetch({
    url:`api/apply/apiList`,
    method:'get'
  })
}


//数据复核-查看复核流程
export function applyProcess(params) {
  return fetch({
    url:'/api/apply/process',
    data:params,
    method:'post'
  })
}

//数据复核——复核
export function applyCheck(params) {
  return fetch({
    url:'/api/apply/check',
    data:params,
    method:'post'
  })
}

//数据复核——拒绝
export function applyRefuse(params) {
  return fetch({
    url:'/api/apply/refuse',
    data:params,
    method:'post'
  })
}

//数据复核——查看结果
export function applyResult(params) {
  return fetch({
    url:'/api/apply/result?id=' + params,
    method:'get'
  })
}



//数据复核——消息
export function applyMsgList() {
  return fetch({
    url:'/api/apply/msg/list',
    method:'get'
  })
}

export function applyMsgRead(params) {
  return fetch({
    url:'/api/apply/msg/read',
    data:params,
    method:'post'
  })
}

import store from '../store'

export function readmsg() {
  applyMsgList().then((res) =>{
    console.log(res.data.total)
    store.commit('updateTotal', res.data.total)
  })
}
