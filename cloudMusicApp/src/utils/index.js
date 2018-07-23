import { Toast } from 'vant'

/**
 * 提示弹窗
 * @param {Boolean} bool
 * @param {String} msg 提示信息
 */
export function notify (bool, msg, code) {
  if (!msg) return
  const typeMap = {
    0: 'fail',
    1: 'success'
  }
  const toast = {
    message: bool ? msg : `${code}${msg}`,
    type: typeMap[Number(bool)],
    duration: 1500
  }
  Toast(toast)
}
