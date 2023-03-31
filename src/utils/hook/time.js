// 时间戳处理函数
function formatTimeStamp(timeStamp) {
  if (timeStamp.toString().length === 10) {
    timeStamp = timeStamp * 1000
  }
  let date = new Date(timeStamp)
  let y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? '0' + MM : MM
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  return y + '-' + MM + '-' + d
}
// 自定义指令
export function directiveTime(app) {
  app.directive('time', {
    mounted: (el) => {
      el.textContent = formatTimeStamp(el.textContent)
    }
  })
}
