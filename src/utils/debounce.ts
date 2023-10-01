//防抖函数
type CallbackFn = (item?: any) => void

let timer:number | null = null
export default function (Callback: CallbackFn, delay:number = 1000) {
  timer != null ? clearTimeout(timer) : null
  timer = setTimeout(() => {
    Callback && Callback() //当有值才会执行
  }, delay)
}