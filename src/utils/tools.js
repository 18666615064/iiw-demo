/**
 * 时间字符串转年月日 2018-09-20 13:23:04 => 2018-09-20
 *
 * @export
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
