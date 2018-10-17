import request from '../utils/request'
export function getInfoImei(url) {
  return request({
    url: `/device/info/imei/${url}`,
    method: 'get'
  })
}
export function getInfoList(query) {
  return request({
    url: '/sensor/top',
    method: 'get',
    params: query
  })
}
export function getMInfoList(query) {
  return request({
    url: '/sensor/last',
    method: 'get',
    params: query
  })
}
export function getGroupList(query) {
  return request({
    url: '/sensor/group',
    method: 'get',
    params: query
  })
}
export function setsave(query) {
  return request({
    url: '/sensor/save',
    method: 'post',
    data: query
  })
}
