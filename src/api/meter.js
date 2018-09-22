import request from '../utils/request'

export function getInfoImei(url) {
  return request({
    url: `/device/info/imei/${url}`,
    method: 'get'
  })
}

export function getInfoList(query) {
  return request({
    url: '/devicecenter/sensor/top',
    // url: '/sensor/top',
    method: 'get',
    params: query
  })
}

export function getMInfoList(query) {
  return request({
    url: '/devicecenter/sensor/last',
    // url: '/sensor/last',
    method: 'get',
    params: query
  })
}
