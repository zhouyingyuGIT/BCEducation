import fetch from '../utils/fetch'

export function financeSearch(url,params) {
  return fetch({
    url:`api/${url}`,
    data:params,
    method:'post'
  })
}
