import * as types from './mutation-types'

const mutations = {
  [types.UPDATE_NAV](state,activeMenuName){
    state.activeMenuName = activeMenuName
  },
  [types.UPDATE_SIDER](state,activeSiderIndex){
    state.activeSiderIndex = activeSiderIndex
  },
  [types.UPDATE_MSGTOTAL](state,msgTotal){
    state.msgTotal = msgTotal
  },
  [types.UPDATE_CHECKLIST](state,checkCodeList){
    state.checkCodeList =checkCodeList
  },
  [types.UPDATE_COMMITLIST](state,commitCodeList){
    state.commitCodeList = commitCodeList
  },
  updateTotal(state,msgTotal){
    state.msgTotal = msgTotal
  }
}
export default mutations
