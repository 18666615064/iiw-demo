import request from '../utils/request'

export function getInfoImei(url) {
  return request({
    url: `/device/info/imei/${url}`,
    method: 'get'
  })
}
