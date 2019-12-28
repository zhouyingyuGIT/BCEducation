import fetch from "../utils/fetch"


export function getBankList() {
   return fetch({
     url:`api/bank-info/list`,
     method:'get'
   })
}

//对公客户的交易流水记录明细验真
export function publicSearch(params) {
  return fetch({
    url:`api/transactionValidation/customer`,
    data:params,
    method:'post'
  })
}

//对公客户的交易流水记录明细验真--批量查询--模板下载
export function getTemplateDownload(params) {
  return fetch({
    url:`api/file/downloadTemplate`,
    data:params,
    method:'get'
  })
}

//对公客户的交易流水记录明细验真--批量查询--上传查询模板
export function uploadFile(params) {
  return fetch({
    url:`/api/file/uploadExcel`,
    data:params,
    method:'post',
  })
}

//对公客户的交易流水记录明细验真--批量查询--下载查询结果
export function getDownloadResult(params) {
  return fetch({
    url:`api/transactionValidation/customerExcel`,
    data:params,
    method:'post',
  })
}

//企业活期账户概要
export function getCurrentAccountInfo(params) {
  return fetch({
    url:`api/corpCustomersAccount/currentAccountInfo`,
    data:params,
    method:'post'
  })
}

//对公信贷客户在全辖的结算量
export function getSettlementAmount(params) {
  return fetch({
    url:`/api/corpCustomersAccount/settlementAmount`,
    data:params,
    method:'post'
  })
}

//信贷资金流向监控
export function getFundFlow(params) {
  return fetch({
    url:`/api/corpCustomersAccount/fundFlow`,
    data:params,
    method:'post'
  })
}

//监管法规查询
export function getCodeSearch(params) {
  return fetch({
    url:`/api/docs/search`,
    data:params,
    method:'post'
  })
}

//监管法规详情查询
export function getCodeSearchDetail(url) {
  return fetch({
    url:url,
    method:'get'
  })
}

//数据分享-获取主题列表
export function getThemeList() {
  return fetch({
    url:`/api/share/themeList`,
    method:'get'
  })
}
//获取数据集列表
export function getDataList(params ) {
  return fetch({
    url:`/api/share/fileset/list`,
    data:params ,
    method:'post'
  })
}
//数据分享-资料下载
export function downLoad(params) {
  return fetch({
    url:`/api/share/fileset/download`,
    data:params ,
    method:'post',
    responseType: 'blob'
  })
}
