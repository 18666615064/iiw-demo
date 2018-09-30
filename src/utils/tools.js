/**
 * 时间字符串转年月日
 * @example 2018-09-20 13:23:04 => 2018-09-20
 * @export TimeDate
 * @param {*} string
 * @returns
 */
export function TimeDate(string) {
  let date = new Date(string)
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  return `${year}-${month}-${day}`
}

/**
 * 时间字符串算时间差
 * @example '2018-09-30 11:04:55', '2018-09-31 12:15:55' => 25小时11分
 * @export Timediff
 * @param {*} newtime
 * @param {*} oldtime
 * @returns
 */
export function Timediff(oldtime, newtime) {
  let oldT = new Date(oldtime).getTime() / 1000
  let newT = new Date(newtime).getTime() / 1000
  let date = newT - oldT
  let Hours = Math.floor(date / 3600) === 0 ? '' : `${Math.floor(date / 3600)}小时`
  let Minute = Math.floor((date % (3600)) / 60) === 0 ? '' : `${Math.floor((date % (3600)) / 60)}分`
  let Second = Math.floor(date % (3600 * 60)) === 0 ? '' : `${Math.floor(date % (3600 * 60))}秒`
  return Hours + Minute + Second
}
