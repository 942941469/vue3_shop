// 存储token
export const setCache = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
// 读取token
export const getCache = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}
// 清除token
export const deleteCache = (key) => {
  window.localStorage.removeItem(key)
}
