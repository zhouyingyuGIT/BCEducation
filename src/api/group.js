import fetch from '../utils/fetch'

export function getGroup() {
  return fetch({
    url:`api/group/list`,
    method:'get'
  })
}

// 大屏app
export function getGroup2() {
  return fetch({
    url:`api/group/list2`,
    method:'get'
  })
}


export function getGroupMenu(params) {
  return fetch({
    url:`api/info/list?groupId=${params}`,
    method:'get'
  })
}

